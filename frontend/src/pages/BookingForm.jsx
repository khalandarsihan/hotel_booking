import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { Calendar, User, Users, CreditCard, Phone, Mail, Clock, Building, Info, Bed, CheckCircle } from 'lucide-react';

const BookingForm = ({ booking = null, onSubmit, onCancel }) => {
  const { themeStyles } = useTheme();
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phoneNumber: '',
    propertyId: '',
    roomType: '',
    roomNumber: '',
    guests: 1,
    checkIn: '',
    checkOut: '',
    specialRequests: '',
    paymentMethod: 'credit_card',
    paymentStatus: 'pending'
  });
  const [properties, setProperties] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [step, setStep] = useState(1);

const mockProperties = [
    { id: '1', name: 'Al Noor Tower' },
    { id: '2', name: 'Zamzam View' },
    { id: '3', name: 'Al Safa Heights' },
    { id: '4', name: 'Al Masjid Residency' }
  ];

  const mockRoomTypes = {
    '1': [ // Al Noor Tower
      { type: 'Standard', rate: 120, available: ['101', '103', '107', '201', '204'] },
      { type: 'Deluxe', rate: 180, available: ['301', '302', '304'] },
      { type: 'Suite', rate: 250, available: ['501', '502'] }
    ],
    '2': [ // Zamzam View
      { type: 'Standard', rate: 110, available: ['101', '104', '106'] },
      { type: 'Deluxe', rate: 160, available: ['201', '205'] },
      { type: 'Suite', rate: 220, available: ['301'] }
    ],
    '3': [ // Al Safa Heights
      { type: 'Standard', rate: 100, available: ['101', '102', '103', '104', '105'] },
      { type: 'Deluxe', rate: 150, available: ['201', '202', '203'] }
    ],
    '4': [ // Al Masjid Residency
      { type: 'Standard', rate: 130, available: ['101', '103'] },
      { type: 'Deluxe', rate: 190, available: ['201', '202'] },
      { type: 'Suite', rate: 270, available: ['301'] }
    ]
  };

  // Load properties on component mount
  useEffect(() => {
    setProperties(mockProperties);
    
    // If booking is provided, we're in edit mode
    if (booking) {
      setIsEditMode(true);
      setFormData({
        guestName: booking.guestName || '',
        email: booking.email || '',
        phoneNumber: booking.phoneNumber || '',
        propertyId: booking.propertyId || '',
        roomType: booking.roomType || '',
        roomNumber: booking.roomNumber || '',
        guests: booking.guests || 1,
        checkIn: booking.checkIn || '',
        checkOut: booking.checkOut || '',
        specialRequests: booking.specialRequests || '',
        paymentMethod: booking.paymentMethod || 'credit_card',
        paymentStatus: booking.paymentStatus || 'pending'
      });
      
      // Set available room types based on selected property
      if (booking.propertyId) {
        updateAvailableRooms(booking.propertyId, booking.roomType);
      }
    } else {
      // Set default check-in to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Set default check-out to 5 days from now
      const checkOut = new Date();
      checkOut.setDate(checkOut.getDate() + 5);
      
      setFormData(prevState => ({
        ...prevState,
        checkIn: formatDateForInput(tomorrow),
        checkOut: formatDateForInput(checkOut)
      }));
    }
  }, [booking]);

  // Format date for date input
  const formatDateForInput = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for the field being changed
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
    
    // Special handling for property selection
    if (name === 'propertyId') {
      setFormData(prevState => ({
        ...prevState,
        roomType: '',
        roomNumber: ''
      }));
      
      if (value) {
        updateAvailableRooms(value);
      }
    }
    
    // Special handling for room type selection
    if (name === 'roomType') {
      setFormData(prevState => ({
        ...prevState,
        roomNumber: ''
      }));
    }
  };

  // Update available rooms based on selected property and room type
  const updateAvailableRooms = (propertyId, roomType = '') => {
    if (mockRoomTypes[propertyId]) {
      setAvailableRooms(mockRoomTypes[propertyId]);
      
      // If room type is provided, update available room numbers
      if (roomType && mockRoomTypes[propertyId].find(room => room.type === roomType)) {
        // Room type is valid for this property
      }
    } else {
      setAvailableRooms([]);
    }
  };

  // Calculate total booking amount
  const calculateTotal = () => {
    if (!formData.propertyId || !formData.roomType || !formData.checkIn || !formData.checkOut) {
      return 0;
    }
    
    // Find room rate
    const selectedRoomType = availableRooms.find(room => room.type === formData.roomType);
    if (!selectedRoomType) return 0;
    
    // Calculate number of nights
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nightsStay = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return selectedRoomType.rate * nightsStay;
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.guestName.trim()) {
      errors.guestName = 'Guest name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.propertyId) {
      errors.propertyId = 'Property selection is required';
    }
    
    if (!formData.roomType) {
      errors.roomType = 'Room type is required';
    }
    
    if (!formData.roomNumber) {
      errors.roomNumber = 'Room number is required';
    }
    
    if (!formData.checkIn) {
      errors.checkIn = 'Check-in date is required';
    }
    
    if (!formData.checkOut) {
      errors.checkOut = 'Check-out date is required';
    } else if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      errors.checkOut = 'Check-out date must be after check-in date';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Calculate total amount
      const totalAmount = calculateTotal();
      
      // Create booking object
      const bookingData = {
        ...formData,
        totalAmount,
        status: isEditMode ? booking.status : 'confirmed',
        id: isEditMode ? booking.id : `B${Math.floor(1000 + Math.random() * 9000)}`, // Generate random booking ID
        createdAt: isEditMode ? booking.createdAt : new Date().toISOString()
      };
      
      // Call the onSubmit callback
      onSubmit(bookingData);
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.querySelector(`[name=${firstErrorField}]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  // Next step in multi-step form
  const goToNextStep = () => {
    if (step === 1) {
      // Validate first step fields
      const errors = {};
      
      if (!formData.guestName.trim()) {
        errors.guestName = 'Guest name is required';
      }
      
      if (!formData.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Invalid email format';
      }
      
      if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = 'Phone number is required';
      }
      
      setFormErrors(errors);
      
      if (Object.keys(errors).length === 0) {
        setStep(2);
      }
    } else if (step === 2) {
      // Validate second step fields
      const errors = {};
      
      if (!formData.propertyId) {
        errors.propertyId = 'Property selection is required';
      }
      
      if (!formData.roomType) {
        errors.roomType = 'Room type is required';
      }
      
      if (!formData.roomNumber) {
        errors.roomNumber = 'Room number is required';
      }
      
      if (!formData.checkIn) {
        errors.checkIn = 'Check-in date is required';
      }
      
      if (!formData.checkOut) {
        errors.checkOut = 'Check-out date is required';
      } else if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
        errors.checkOut = 'Check-out date must be after check-in date';
      }
      
      setFormErrors(errors);
      
      if (Object.keys(errors).length === 0) {
        setStep(3);
      }
    }
  };

  // Previous step in multi-step form
  const goToPreviousStep = () => {
    setStep(prevStep => Math.max(1, prevStep - 1));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Form Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditMode ? 'Edit Booking' : 'New Booking'}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {isEditMode ? 'Modify booking details' : 'Create a new guest booking'}
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
            step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            <User size={16} />
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
            step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            <Building size={16} />
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            step >= 3 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
          }`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
            step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}>
            <CreditCard size={16} />
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>Guest Info</span>
          <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>Stay Details</span>
          <span className={step >= 3 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}>Payment & Confirm</span>
        </div>
      </div>
      
      {/* Form Body */}
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4">
          {/* Step 1: Guest Information */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Guest Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="guestName"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    className={`pl-10 block w-full border ${
                      formErrors.guestName 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter guest name"
                  />
                </div>
                {formErrors.guestName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.guestName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 block w-full border ${
                      formErrors.email 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter email address"
                  />
                </div>
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`pl-10 block w-full border ${
                      formErrors.phoneNumber 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter phone number"
                  />
                </div>
                {formErrors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.phoneNumber}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users size={16} className="text-gray-400" />
                  </div>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Stay Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="propertyId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Property*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building size={16} className="text-gray-400" />
                  </div>
                  <select
                    id="propertyId"
                    name="propertyId"
                    value={formData.propertyId}
                    onChange={handleChange}
                    className={`pl-10 block w-full border ${
                      formErrors.propertyId 
                        ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  >
                    <option value="">Select a property</option>
                    {properties.map(property => (
                      <option key={property.id} value={property.id}>{property.name}</option>
                    ))}
                  </select>
                </div>
                {formErrors.propertyId && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.propertyId}</p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Type*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Bed size={16} className="text-gray-400" />
                    </div>
                    <select
                      id="roomType"
                      name="roomType"
                      value={formData.roomType}
                      onChange={handleChange}
                      disabled={!formData.propertyId}
                      className={`pl-10 block w-full border ${
                        formErrors.roomType 
                          ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        !formData.propertyId ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">Select room type</option>
                      {availableRooms.map(room => (
                        <option key={room.type} value={room.type}>
                          {room.type} - ₹{room.rate}/night
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.roomType && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.roomType}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Room Number*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home size={16} className="text-gray-400" />
                    </div>
                    <select
                      id="roomNumber"
                      name="roomNumber"
                      value={formData.roomNumber}
                      onChange={handleChange}
                      disabled={!formData.roomType}
                      className={`pl-10 block w-full border ${
                        formErrors.roomNumber 
                          ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        !formData.roomType ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="">Select room number</option>
                      {formData.roomType && availableRooms.find(r => r.type === formData.roomType)?.available.map(roomNum => (
                        <option key={roomNum} value={roomNum}>Room {roomNum}</option>
                      ))}
                    </select>
                  </div>
                  {formErrors.roomNumber && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.roomNumber}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check-in Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={formatDateForInput(new Date())}
                      className={`pl-10 block w-full border ${
                        formErrors.checkIn 
                          ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                  </div>
                  {formErrors.checkIn && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.checkIn}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Check-out Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || formatDateForInput(new Date())}
                      className={`pl-10 block w-full border ${
                        formErrors.checkOut
                          ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                  </div>
                  {formErrors.checkOut && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.checkOut}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Requests
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <Info size={16} className="text-gray-400" />
                  </div>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter any special requests or requirements"
                  ></textarea>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment & Confirmation */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Booking Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Guest:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{formData.guestName}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Property:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {properties.find(p => p.id === formData.propertyId)?.name || ''}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Room:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {formData.roomType} - Room {formData.roomNumber}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Check-in:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {formatDate(formData.checkIn)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Check-out:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {formatDate(formData.checkOut)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Guests:</span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {formData.guests} {formData.guests === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Room Rate:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {formatCurrency(availableRooms.find(room => room.type === formData.roomType)?.rate || 0)}/night
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Stay Duration:</span>
                      <span className="text-gray-900 dark:text-white font-medium">
                        {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
                      </span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg mt-3">
                      <span className="text-gray-800 dark:text-gray-200">Total Amount:</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard size={16} className="text-gray-400" />
                  </div>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="cash">Cash on Arrival</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Status
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CheckCircle size={16} className="text-gray-400" />
                  </div>
                  <select
                    id="paymentStatus"
                    name="paymentStatus"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                    className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial Payment</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircle size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Confirmation Policy</h3>
                    <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                      By submitting this booking, you confirm that all guest details are correct. Cancellations are accepted up to 24 hours before check-in with no penalty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Form Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          
          {step < 3 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700"
            >
              {isEditMode ? 'Update Booking' : 'Confirm Booking'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
  
  // Helper functions
  function formatDate(dateString) {
    if (!dateString) return '';
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  
  function calculateNights() {
    if (!formData.checkIn || !formData.checkOut) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nightsStay = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nightsStay;
  }
};

export default BookingForm;