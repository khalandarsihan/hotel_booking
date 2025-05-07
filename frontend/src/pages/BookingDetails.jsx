// frontend/src/pages/BookingDetail.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { CalendarDays, User, Users, FileText, Check, CreditCard, Phone, Mail, Home, Clock, Building, ArrowLeft, Printer, Edit, X, CheckCircle, XCircle } from 'lucide-react';

const BookingDetails = ({ bookingId }) => {
  const { themeStyles } = useTheme();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  // In a real application, fetch booking details from the API
  useEffect(() => {
    // Mock API call
    const fetchBookingDetail = async () => {
      setLoading(true);
      try {
        // In a real app, this would be a fetch call to your API
        // await fetch(`/api/bookings/${bookingId}`)
        
        // For now, we'll use mock data
        const mockBooking = {
          id: bookingId || 'B1001',
          guestName: 'Mohammed Al-Farsi',
          email: 'mohammed.alfarsi@example.com',
          phoneNumber: '+966 51 234 5678',
          property: 'Al Noor Tower',
          roomType: 'Deluxe',
          roomNumber: '301',
          checkIn: '2025-05-05',
          checkOut: '2025-05-12',
          status: 'confirmed',
          paymentStatus: 'paid',
          paymentMethod: 'credit_card',
          totalAmount: 1260,
          createdAt: '2025-04-28T10:30:00',
          modifiedAt: '2025-04-28T14:15:00',
          notes: 'Guest is a repeat customer, VIP treatment requested.',
          specialRequests: 'Near elevator, extra prayer mat requested',
          guests: 2,
          agentName: 'Abdullah Ibrahim',
          bookingSource: 'Direct',
          history: [
            { date: '2025-04-28T10:30:00', action: 'Booking created', user: 'Abdullah Ibrahim' },
            { date: '2025-04-28T14:15:00', action: 'Payment confirmed', user: 'Payment System' }
          ],
          documents: [
            { name: 'Booking Confirmation', type: 'PDF', date: '2025-04-28' },
            { name: 'Payment Receipt', type: 'PDF', date: '2025-04-28' }
          ]
        };
        
        setTimeout(() => {
          setBooking(mockBooking);
          setLoading(false);
        }, 500); // Simulate API delay
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      }
    };
    
    fetchBookingDetail();
  }, [bookingId]);

  // Format date for display
  const formatDate = (dateString, includeTime = false) => {
    if (!dateString) return '';
    
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    if (includeTime) {
      options.hour = '2-digit';
      options.minute = '2-digit';
    }
    
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Calculate number of nights
  const calculateNights = () => {
    if (!booking) return 0;
    
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    
    return Math.round((checkOut - checkIn) / (86400000)); // 86400000 = ms in a day
  };

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'checked-in':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'completed':
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  // Get payment status badge styling
  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
      case 'partial':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'refunded':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center`}>
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 dark:border-blue-400 mb-2"></div>
          <p className="text-gray-500 dark:text-gray-400">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md w-full text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Booking Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The booking you're looking for does not exist or might have been deleted.
          </p>
          <a 
            href="/bookings" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bookings
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center">
            <a href="/bookings" className="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <ArrowLeft size={20} />
            </a>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking #{booking.id}</h1>
              <div className="mt-1 flex items-center">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
                <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Created on {formatDate(booking.createdAt, true)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <a 
              href={`/edit-booking?id=${booking.id}`}
              className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </a>
            {booking.status === 'confirmed' && (
              <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Check In
              </button>
            )}
            {booking.status === 'checked-in' && (
              <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Check Out
              </button>
            )}
            {(booking.status === 'confirmed' || booking.status === 'pending') && (
              <button className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </button>
            )}
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-t-lg mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'details' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('details')}
            >
              Booking Details
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'guest' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('guest')}
            >
              Guest Details
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'history' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Activity History
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-b-lg p-6 mb-6">
          {/* Booking Details Tab */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Booking Information</h2>
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Property</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.property}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Home className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Room</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.roomType} - Room {booking.roomNumber}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Number of Guests</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.guests} {booking.guests === 1 ? 'Person' : 'People'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <CalendarDays className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Check-in / Check-out</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(booking.checkIn)} to {formatDate(booking.checkOut)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {calculateNights()} {calculateNights() === 1 ? 'night' : 'nights'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <User className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Booking Agent</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.agentName}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Special Requests</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.specialRequests || 'None'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Details</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Room Rate</span>
                      <span className="text-sm text-gray-900 dark:text-white">₹{(booking.totalAmount / calculateNights()).toFixed(2)} × {calculateNights()} nights</span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                      <div className="flex justify-between items-center font-medium">
                        <span className="text-base text-gray-900 dark:text-white">Total Amount</span>
                        <span className="text-base text-gray-900 dark:text-white">₹{booking.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Method</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.paymentMethod === 'credit_card' ? 'Credit Card' : 
                           booking.paymentMethod === 'debit_card' ? 'Debit Card' : 
                           booking.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 
                           booking.paymentMethod === 'cash' ? 'Cash' : booking.paymentMethod}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Payment Status</p>
                        <p className={`inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium ${getPaymentStatusBadge(booking.paymentStatus)}`}>
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Booking Source</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.bookingSource}</p>
                      </div>
                    </div>
                  </div>
                  
                  {booking.notes && (
                    <div className="flex flex-col">
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 text-gray-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">Notes</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{booking.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mt-6 mb-4">Documents</h2>
                <div className="space-y-2">
                  {booking.documents.map((doc, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                      <FileText className="h-5 w-5 text-blue-500 mr-3" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{doc.date}</p>
                      </div>
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-500 text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Guest Details Tab */}
          {activeTab === 'guest' && (
            <div className="max-w-2xl">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-gray-900 dark:text-white">{booking.guestName}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Primary Guest</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Email Address</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Phone Number</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{booking.phoneNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <div className="flex items-start">
                      <Users className="h-5 w-5 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Additional Guests</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {booking.guests > 1 ? (booking.guests - 1) + ' additional guest(s)' : 'No additional guests'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Activity History Tab */}
          {activeTab === 'history' && (
            <div className="max-w-3xl">
              <div className="flow-root">
                <ul className="-mb-8">
                  {booking.history.map((event, eventIdx) => (
                    <li key={eventIdx}>
                      <div className="relative pb-8">
                        {eventIdx !== booking.history.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-800 dark:text-gray-200">{event.action}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                              <div>{formatDate(event.date, true)}</div>
                              <div className="text-xs">{event.user}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;