import React, { useState } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { Calendar, ChevronLeft, ChevronRight, Search, Filter, Plus, User, Home, CheckCircle, XCircle } from 'lucide-react';

const BookingsPage = () => {
  const { themeStyles } = useTheme();
  const [activeTab, setActiveTab] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for bookings
  const mockBookings = [
    {
      id: 'B1001',
      guestName: 'Mohammed Al-Farsi',
      property: 'Al Noor Tower',
      roomType: 'Deluxe',
      roomNumber: '301',
      checkIn: '2025-05-05',
      checkOut: '2025-05-12',
      status: 'confirmed',
      guests: 2,
      totalAmount: 1260,
      paymentStatus: 'paid',
      phoneNumber: '+966 51 234 5678',
      specialRequests: 'Near elevator, extra prayer mat'
    },
    {
      id: 'B1002',
      guestName: 'Aisha Mahmoud',
      property: 'Zamzam View',
      roomType: 'Standard',
      roomNumber: '102',
      checkIn: '2025-05-04',
      checkOut: '2025-05-09',
      status: 'checked-in',
      guests: 1,
      totalAmount: 550,
      paymentStatus: 'paid',
      phoneNumber: '+966 50 987 6543',
      specialRequests: 'None'
    },
    {
      id: 'B1003',
      guestName: 'Abdullah Rahman',
      property: 'Al Noor Tower',
      roomType: 'Suite',
      roomNumber: '501',
      checkIn: '2025-05-07',
      checkOut: '2025-05-15',
      status: 'pending',
      guests: 4,
      totalAmount: 2000,
      paymentStatus: 'partial',
      phoneNumber: '+966 54 321 9876',
      specialRequests: 'Extra beds, infant crib'
    },
    {
      id: 'B1004',
      guestName: 'Fatima Al-Saeed',
      property: 'Al Safa Heights',
      roomType: 'Standard',
      roomNumber: '203',
      checkIn: '2025-05-01',
      checkOut: '2025-05-04',
      status: 'completed',
      guests: 2,
      totalAmount: 330,
      paymentStatus: 'paid',
      phoneNumber: '+966 55 123 4567',
      specialRequests: 'None'
    },
    {
      id: 'B1005',
      guestName: 'Omar Khalid',
      property: 'Zamzam View',
      roomType: 'Deluxe',
      roomNumber: '405',
      checkIn: '2025-05-10',
      checkOut: '2025-05-17',
      status: 'confirmed',
      guests: 3,
      totalAmount: 1120,
      paymentStatus: 'pending',
      phoneNumber: '+966 56 789 0123',
      specialRequests: 'Airport pickup service'
    }
  ];

  // Get current date for highlighting today's bookings
  const today = new Date().toISOString().split('T')[0];
  
  // Filter bookings based on tab, search, and filters
  const filteredBookings = mockBookings.filter(booking => {
    // Filter by tab
    if (activeTab === 'current' && (booking.status === 'checked-in' || booking.status === 'confirmed')) {
      // Show only current and upcoming bookings
    } else if (activeTab === 'history' && (booking.status === 'completed' || booking.status === 'cancelled')) {
      // Show only past bookings
    } else if (activeTab === 'all') {
      // Show all bookings
    } else if (activeTab !== 'current' && activeTab !== 'history' && activeTab !== 'all') {
      return false;
    }
    
    // Filter by search term
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by property
    const matchesProperty = selectedProperty === 'all' || booking.property === selectedProperty;
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || booking.status === selectedStatus;
    
    return matchesSearch && matchesProperty && matchesStatus;
  });

  // Properties list for filter dropdown
  const properties = ['Al Noor Tower', 'Zamzam View', 'Al Safa Heights', 'Al Masjid Residency'];
  
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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if a booking is for today
  const isToday = (dateString) => dateString === today;

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your guest bookings</p>
          </div>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>Calendar View</span>
            </button>
            <button className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center">
              <Plus size={16} className="mr-1" />
              <span>New Booking</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'current' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('current')}
            >
              Current & Upcoming
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'history' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Booking History
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'all' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Bookings
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by guest, booking ID, or property..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                >
                  <option value="all">All Properties</option>
                  {properties.map((property) => (
                    <option key={property} value={property}>{property}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked-in">Checked In</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Property / Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Check-in / Check-out
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredBookings.map((booking) => (
                  <tr 
                    key={booking.id} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      isToday(booking.checkIn) || isToday(booking.checkOut) 
                        ? 'bg-blue-50 dark:bg-blue-900/20' 
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      <a href={`/booking-details?id=${booking.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {booking.id}
                      </a>
                      {isToday(booking.checkIn) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          Today's Check-in
                        </span>
                      )}
                      {isToday(booking.checkOut) && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">
                          Today's Check-out
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{booking.guestName}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{booking.phoneNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{booking.property}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {booking.roomType} - Room {booking.roomNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">{formatDate(booking.checkIn)}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">to {formatDate(booking.checkOut)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(booking.status)}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">₹{booking.totalAmount.toLocaleString()}</div>
                      <div className={`text-xs ${
                        booking.paymentStatus === 'paid' 
                          ? 'text-green-600 dark:text-green-400' 
                          : booking.paymentStatus === 'partial' 
                          ? 'text-amber-600 dark:text-amber-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex space-x-2 justify-end">
                        {booking.status === 'confirmed' && (
                          <button className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300" title="Check In">
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {booking.status === 'checked-in' && (
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300" title="Check Out">
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {(booking.status === 'confirmed' || booking.status === 'pending') && (
                          <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300" title="Cancel">
                            <XCircle size={18} />
                          </button>
                        )}
                        <a href={`/booking-details?id=${booking.id}`} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" title="View Details">
                          View
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredBookings.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No bookings match your search criteria.
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {filteredBookings.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{filteredBookings.length}</span> bookings
            </div>
            <div className="flex space-x-2">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <ChevronLeft size={16} className="mr-1" />
                Previous
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                Next
                <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;