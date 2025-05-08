// frontend/src/components/ui/modals/NewSubLeaseModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Building, User, Phone, Mail, Calendar, CreditCard, FileText, CheckCircle } from 'lucide-react';

const NewSubLeaseModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Steps: 1, 2, 3, 4
  const [success, setSuccess] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    // Property Details
    property: '',
    rooms: [],
    startDate: '',
    endDate: '',
    totalRooms: 0,
    
    // Sublessee Details
    sublesseeName: '',
    company: '',
    email: '',
    phone: '',
    address: '',
    
    // Payment Details
    totalAmount: '',
    advancePayment: '',
    paymentMethod: 'bank_transfer',
    paymentSchedule: 'monthly',
    
    // Additional Details
    specialTerms: '',
    notes: ''
  });
  
  // Form errors
  const [errors, setErrors] = useState({});
  
  // Mock properties and rooms data
  const mockProperties = [
    { id: '1', name: 'Al Noor Tower', totalRooms: 80, availableRooms: [
      { id: '101', number: '101', type: 'Standard', floor: 1 },
      { id: '102', number: '102', type: 'Standard', floor: 1 },
      { id: '201', number: '201', type: 'Deluxe', floor: 2 },
      { id: '501', number: '501', type: 'Suite', floor: 5 }
    ]},
    { id: '2', name: 'Zamzam View', totalRooms: 60, availableRooms: [
      { id: '101', number: '101', type: 'Standard', floor: 1 },
      { id: '102', number: '102', type: 'Standard', floor: 1 },
      { id: '201', number: '201', type: 'Deluxe', floor: 2 }
    ]},
    { id: '3', name: 'Al Safa Heights', totalRooms: 90, availableRooms: [
      { id: '101', number: '101', type: 'Standard', floor: 1 },
      { id: '102', number: '102', type: 'Standard', floor: 1 },
      { id: '103', number: '103', type: 'Standard', floor: 1 },
      { id: '104', number: '104', type: 'Standard', floor: 1 }
    ]}
  ];
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error if field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };
  
  // Handle property selection
  const handlePropertyChange = (e) => {
    const propertyId = e.target.value;
    const selectedProperty = mockProperties.find(p => p.id === propertyId);
    
    if (selectedProperty) {
      setFormData({ 
        ...formData, 
        property: propertyId,
        rooms: [],
        totalRooms: 0
      });
    } else {
      setFormData({ 
        ...formData, 
        property: '',
        rooms: [],
        totalRooms: 0
      });
    }
  };
  
  // Handle room selection
  const handleRoomSelection = (roomId) => {
    const selectedProperty = mockProperties.find(p => p.id === formData.property);
    
    if (!selectedProperty) return;
    
    let newRooms = [...formData.rooms];
    
    if (newRooms.includes(roomId)) {
      // Remove room if already selected
      newRooms = newRooms.filter(id => id !== roomId);
    } else {
      // Add room if not selected
      newRooms.push(roomId);
    }
    
    setFormData({
      ...formData,
      rooms: newRooms,
      totalRooms: newRooms.length
    });
  };
  
  // Handle next step
  const handleNextStep = () => {
    // Validate current step
    const valid = validateCurrentStep();
    
    if (valid) {
      setStep(step + 1);
    }
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setStep(Math.max(1, step - 1));
  };
  
  // Validate current step
  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (step === 1) {
      // Validate property details
      if (!formData.property) {
        newErrors.property = 'Please select a property';
      }
      
      if (formData.rooms.length === 0) {
        newErrors.rooms = 'Please select at least one room';
      }
      
      if (!formData.startDate) {
        newErrors.startDate = 'Please select a start date';
      }
      
      if (!formData.endDate) {
        newErrors.endDate = 'Please select an end date';
      } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    } else if (step === 2) {
      // Validate sublessee details
      if (!formData.sublesseeName.trim()) {
        newErrors.sublesseeName = 'Sublessee name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      }
    } else if (step === 3) {
      // Validate payment details
      if (!formData.totalAmount.trim()) {
        newErrors.totalAmount = 'Total amount is required';
      } else if (isNaN(formData.totalAmount) || parseFloat(formData.totalAmount) <= 0) {
        newErrors.totalAmount = 'Please enter a valid amount';
      }
      
      if (!formData.advancePayment.trim()) {
        newErrors.advancePayment = 'Advance payment is required';
      } else if (isNaN(formData.advancePayment) || parseFloat(formData.advancePayment) < 0) {
        newErrors.advancePayment = 'Please enter a valid amount';
      } else if (parseFloat(formData.advancePayment) > parseFloat(formData.totalAmount)) {
        newErrors.advancePayment = 'Advance payment cannot exceed total amount';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStep(4); // Move to confirmation step
      
      // In a real app, you would make an API call to create the sublease
    }, 1500);
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    if (!amount) return '₹0';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };
  
  // ESC key to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  // Calculate total number of days
  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0;
    
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {step === 4 ? 'Sublease Created Successfully' : 'Create New Sublease Agreement'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>

          {/* Progress steps */}
          {step < 4 && (
            <div className="mb-6">
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  <Building size={16} />
                </div>
                <div className={`flex-1 h-1 mx-2 ${
                  step >= 2 ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                  step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}>
                  <User size={16} />
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
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Property Details</span>
                <span>Sublessee Information</span>
                <span>Payment Terms</span>
              </div>
            </div>
          )}

          {/* Step 1: Property Details */}
          {step === 1 && (
            <div>
              <div className="space-y-4">
                <div>
                  <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Select Property*
                  </label>
                  <select
                    id="property"
                    name="property"
                    value={formData.property}
                    onChange={handlePropertyChange}
                    className={`block w-full rounded-md border ${
                      errors.property ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                  >
                    <option value="">Select a property</option>
                    {mockProperties.map(property => (
                      <option key={property.id} value={property.id}>{property.name}</option>
                    ))}
                  </select>
                  {errors.property && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.property}</p>}
                </div>

                {formData.property && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Select Rooms* ({formData.rooms.length} selected)
                    </label>
                    <div className="mt-1 border border-gray-300 dark:border-gray-600 rounded-md overflow-y-auto max-h-48 p-2">
                      <div className="grid grid-cols-2 gap-2">
                        {mockProperties.find(p => p.id === formData.property)?.availableRooms.map(room => (
                          <div 
                            key={room.id}
                            onClick={() => handleRoomSelection(room.id)}
                            className={`p-2 rounded border cursor-pointer ${
                              formData.rooms.includes(room.id) 
                                ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                                : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Room {room.number}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{room.type}</p>
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Floor {room.floor}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {errors.rooms && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.rooms}</p>}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Start Date*
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`block w-full rounded-md border ${
                        errors.startDate ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                    {errors.startDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      End Date*
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className={`block w-full rounded-md border ${
                        errors.endDate ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                    {errors.endDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.endDate}</p>}
                  </div>
                </div>

                {formData.startDate && formData.endDate && new Date(formData.endDate) > new Date(formData.startDate) && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Lease Duration: <span className="font-medium">{calculateDays()} days</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Sublessee Information */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="sublesseeName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sublessee Name*
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="sublesseeName"
                    name="sublesseeName"
                    value={formData.sublesseeName}
                    onChange={handleChange}
                    className={`pl-10 block w-full rounded-md border ${
                      errors.sublesseeName ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Enter full name or company name"
                  />
                </div>
                {errors.sublesseeName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sublesseeName}</p>}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company/Organization (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Company or organization name if applicable"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      className={`pl-10 block w-full rounded-md border ${
                        errors.email ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Email address"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.phone ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Phone number"
                    />
                  </div>
                  {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address (Optional)
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Street address, city, state, country"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 3: Payment Terms */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Lease Amount (₹)*
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    className={`block w-full rounded-md border ${
                      errors.totalAmount ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Total lease amount"
                  />
                  {errors.totalAmount && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.totalAmount}</p>}
                </div>

                <div>
                  <label htmlFor="advancePayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Advance Payment (₹)*
                  </label>
                  <input
                    type="number"
                    id="advancePayment"
                    name="advancePayment"
                    value={formData.advancePayment}
                    onChange={handleChange}
                    min="0"
                    step="1000"
                    className={`block w-full rounded-md border ${
                      errors.advancePayment ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                    } shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="Initial payment amount"
                  />
                  {errors.advancePayment && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.advancePayment}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cash">Cash</option>
                  <option value="check">Check</option>
                </select>
              </div>

              <div>
                <label htmlFor="paymentSchedule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Payment Schedule
                </label>
                <select
                  id="paymentSchedule"
                  name="paymentSchedule"
                  value={formData.paymentSchedule}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="biannual">Bi-Annual</option>
                  <option value="annual">Annual</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label htmlFor="specialTerms" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Special Terms & Conditions (Optional)
                </label>
                <textarea
                  id="specialTerms"
                  name="specialTerms"
                  value={formData.specialTerms}
                  onChange={handleChange}
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special terms or conditions for this sublease"
                ></textarea>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional notes"
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sublease Created Successfully</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                The sublease agreement has been created and saved.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4 text-left">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Property:</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {mockProperties.find(p => p.id === formData.property)?.name || ''}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Rooms:</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formData.totalRooms} {formData.totalRooms === 1 ? 'room' : 'rooms'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sublessee:</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formData.sublesseeName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration:</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{calculateDays()} days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Period:</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Total Amount:</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(formData.totalAmount)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  onClick={onClose}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    // Reset form and go back to step 1
                    setFormData({
                      property: '',
                      rooms: [],
                      startDate: '',
                      endDate: '',
                      totalRooms: 0,
                      sublesseeName: '',
                      company: '',
                      email: '',
                      phone: '',
                      address: '',
                      totalAmount: '',
                      advancePayment: '',
                      paymentMethod: 'bank_transfer',
                      paymentSchedule: 'monthly',
                      specialTerms: '',
                      notes: ''
                    });
                    setStep(1);
                    setSuccess(false);
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Create Another Sublease
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          {step !== 4 && (
            <div className="mt-6 flex justify-end space-x-3">
              {step > 1 && (
                <button
                  onClick={handlePrevStep}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Previous
                </button>
              )}
              
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              
              {step < 3 ? (
                <button
                  onClick={handleNextStep}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Next
                </button>
              ) : step === 3 && (
                <button
                  onClick={handleSubmit}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Creating Sublease...' : 'Create Sublease'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NewSubLeaseModal;