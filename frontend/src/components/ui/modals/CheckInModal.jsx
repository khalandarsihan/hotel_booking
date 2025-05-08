// frontend/src/components/ui/modals/CheckInModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Search, User, Home, Users, Calendar, FileText, CheckCircle } from 'lucide-react';

const CheckInModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('search'); // 'search', 'details', 'confirmation'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock bookings data
  const mockBookings = [
    { id: 'B1001', guestName: 'Mohammed Al-Farsi', property: 'Al Noor Tower', roomNumber: '301', checkIn: '2025-05-08', checkOut: '2025-05-15', status: 'confirmed' },
    { id: 'B1005', guestName: 'Omar Khalid', property: 'Zamzam View', roomNumber: '405', checkIn: '2025-05-10', checkOut: '2025-05-17', status: 'confirmed' },
    { id: 'B1006', guestName: 'Aisha Rahman', property: 'Al Noor Tower', roomNumber: '205', checkIn: '2025-05-08', checkOut: '2025-05-12', status: 'confirmed' },
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.length > 2) {
      // In a real app, this would be an API call
      const filteredResults = mockBookings.filter(
        booking => 
          booking.status === 'confirmed' && 
          (booking.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           booking.guestName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Select booking and go to details step
  const handleSelectBooking = (booking) => {
    setSelectedBooking(booking);
    setStep('details');
  };

  // Process check-in
  const handleCheckIn = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStep('confirmation');
      
      // In a real app, you would update the booking status here
    }, 1000);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75" onClick={onClose}></div>

        {/* Modal panel */}
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {step === 'search' && 'Check-In Guest'}
              {step === 'details' && 'Guest Check-In Details'}
              {step === 'confirmation' && 'Check-In Successful'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Step */}
          {step === 'search' && (
            <div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Search for a guest or booking ID to check in:
                </p>
              </div>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter booking ID or guest name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 max-h-60 overflow-y-auto">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select a booking:
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleSelectBooking(booking)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{booking.guestName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {booking.property} - Room {booking.roomNumber}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {booking.id}
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Check-in: {formatDate(booking.checkIn)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery.length > 2 && searchResults.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No confirmed bookings found.</p>
                </div>
              )}
            </div>
          )}

          {/* Details Step */}
          {step === 'details' && selectedBooking && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{selectedBooking.guestName}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Booking ID: {selectedBooking.id}</p>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Confirmed
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Property:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedBooking.property}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Room:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedBooking.roomNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Check-in:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedBooking.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Check-out:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{formatDate(selectedBooking.checkOut)}</p>
                  </div>
                </div>
              </div>

              {/* Optional notes */}
              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special requests or notes for this check-in"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
              </div>

              {/* Checklist */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Check-in Checklist:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="id-verified"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="id-verified" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      ID verified
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="payment-confirmed"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="payment-confirmed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Payment confirmed
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="room-ready"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="room-ready" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Room ready
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Check-In Successful</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedBooking?.guestName} has been successfully checked in to {selectedBooking?.property}, Room {selectedBooking?.roomNumber}.
              </p>
              
              <div className="mt-6 flex justify-center space-x-3">
                <button
                  onClick={onClose}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 dark:text-blue-100 bg-blue-100 dark:bg-blue-900 border border-transparent rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none"
                >
                  Done
                </button>
                <button
                  onClick={() => {
                    setStep('search');
                    setSearchQuery('');
                    setSelectedBooking(null);
                    setAdditionalNotes('');
                    setSuccess(false);
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Check In Another Guest
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          {step !== 'confirmation' && (
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              
              {step === 'details' && (
                <button
                  onClick={handleCheckIn}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Complete Check-In'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInModal;