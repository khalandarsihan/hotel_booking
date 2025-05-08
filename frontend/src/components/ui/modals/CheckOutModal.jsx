// frontend/src/components/ui/modals/CheckOutModal.jsx
import React, { useState, useEffect } from 'react';
import { X, Search, User, Home, CreditCard, Calendar, Clock, CheckCircle } from 'lucide-react';

const CheckOutModal = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('search'); // 'search', 'details', 'payment', 'confirmation'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [additionalCharges, setAdditionalCharges] = useState([
    { id: 1, description: '', amount: '', selected: false }
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock bookings data - currently checked in guests
  const mockBookings = [
    { id: 'B1002', guestName: 'Aisha Mahmoud', property: 'Zamzam View', roomNumber: '102', checkIn: '2025-05-04', checkOut: '2025-05-09', status: 'checked-in', payment: { totalAmount: 550, paidAmount: 550, pendingAmount: 0 } },
    { id: 'B1007', guestName: 'Yusuf Khan', property: 'Al Noor Tower', roomNumber: '204', checkIn: '2025-05-02', checkOut: '2025-05-08', status: 'checked-in', payment: { totalAmount: 960, paidAmount: 960, pendingAmount: 0 } },
    { id: 'B1009', guestName: 'Fatima Al-Zahra', property: 'Al Safa Heights', roomNumber: '305', checkIn: '2025-05-05', checkOut: '2025-05-10', status: 'checked-in', payment: { totalAmount: 750, paidAmount: 500, pendingAmount: 250 } },
  ];

  // Handle search
  useEffect(() => {
    if (searchQuery.length > 2) {
      // In a real app, this would be an API call
      const filteredResults = mockBookings.filter(
        booking => 
          booking.status === 'checked-in' && 
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

  // Go to payment step
  const handleGoToPayment = () => {
    setStep('payment');
  };

  // Add new additional charge
  const handleAddCharge = () => {
    setAdditionalCharges([
      ...additionalCharges,
      { id: additionalCharges.length + 1, description: '', amount: '', selected: false }
    ]);
  };

  // Update additional charge
  const handleUpdateCharge = (id, field, value) => {
    setAdditionalCharges(additionalCharges.map(charge => 
      charge.id === id ? { ...charge, [field]: value } : charge
    ));
  };

  // Toggle additional charge
  const handleToggleCharge = (id) => {
    setAdditionalCharges(additionalCharges.map(charge => 
      charge.id === id ? { ...charge, selected: !charge.selected } : charge
    ));
  };

  // Calculate total additional charges
  const calculateAdditionalCharges = () => {
    return additionalCharges
      .filter(charge => charge.selected && charge.description && charge.amount)
      .reduce((total, charge) => total + parseFloat(charge.amount || 0), 0);
  };

  // Calculate total amount to be paid
  const calculateTotalAmount = () => {
    if (!selectedBooking) return 0;
    return (selectedBooking.payment.pendingAmount || 0) + calculateAdditionalCharges();
  };

  // Process check-out
  const handleCheckOut = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStep('confirmation');
      
      // In a real app, you would update the booking status and process payment here
    }, 1500);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format currency
  const formatCurrency = (amount) => {
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
              {step === 'search' && 'Process Guest Check-Out'}
              {step === 'details' && 'Guest Check-Out Details'}
              {step === 'payment' && 'Payment Settlement'}
              {step === 'confirmation' && 'Check-Out Successful'}
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
                  Search for a guest or booking ID to process check-out:
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
                          Check-out: {formatDate(booking.checkOut)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery.length > 2 && searchResults.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No checked-in guests found.</p>
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
                  <div className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    Checked In
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

                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Total Amount:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(selectedBooking.payment.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Paid Amount:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{formatCurrency(selectedBooking.payment.paidAmount)}</span>
                  </div>
                  {selectedBooking.payment.pendingAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Pending Amount:</span>
                      <span className="font-medium text-amber-600 dark:text-amber-400">{formatCurrency(selectedBooking.payment.pendingAmount)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Room Check */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Room Check:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="room-inspected"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="room-inspected" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Room inspected
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="no-damage"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="no-damage" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      No damage or missing items
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="keys-returned"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="keys-returned" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Keys returned
                    </label>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Check-Out Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any notes about the check-out process"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && selectedBooking && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Payment Summary</h4>
                
                {selectedBooking.payment.pendingAmount > 0 && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-500 dark:text-gray-400">Pending Amount:</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">{formatCurrency(selectedBooking.payment.pendingAmount)}</span>
                  </div>
                )}

                {/* Additional Charges */}
                <div className="mt-3">
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">Additional Charges:</h5>
                    <button
                      type="button"
                      onClick={handleAddCharge}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      + Add Charge
                    </button>
                  </div>
                  
                  {additionalCharges.map((charge) => (
                    <div key={charge.id} className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id={`charge-${charge.id}`}
                        checked={charge.selected}
                        onChange={() => handleToggleCharge(charge.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={charge.description}
                        onChange={(e) => handleUpdateCharge(charge.id, 'description', e.target.value)}
                        className="flex-grow text-sm rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-1 px-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Amount"
                        value={charge.amount}
                        onChange={(e) => handleUpdateCharge(charge.id, 'amount', e.target.value)}
                        className="w-20 text-sm rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-1 px-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-700 dark:text-gray-300">Total to Pay:</span>
                    <span className="text-gray-900 dark:text-white">{formatCurrency(calculateTotalAmount())}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              {calculateTotalAmount() > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method:
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment-method"
                        value="credit_card"
                        checked={paymentMethod === 'credit_card'}
                        onChange={() => setPaymentMethod('credit_card')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="credit-card" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Credit/Debit Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cash"
                        name="payment-method"
                        value="cash"
                        checked={paymentMethod === 'cash'}
                        onChange={() => setPaymentMethod('cash')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="cash" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Cash
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="bank-transfer"
                        name="payment-method"
                        value="bank_transfer"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <label htmlFor="bank-transfer" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Bank Transfer
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Check-Out Successful</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {selectedBooking?.guestName} has been successfully checked out from {selectedBooking?.property}, Room {selectedBooking?.roomNumber}.
              </p>
              
              {calculateTotalAmount() > 0 && (
                <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-md inline-block">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Payment of {formatCurrency(calculateTotalAmount())} completed via {paymentMethod === 'credit_card' ? 'Credit/Debit Card' : paymentMethod === 'cash' ? 'Cash' : 'Bank Transfer'}.
                  </p>
                </div>
              )}
              
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
                    setAdditionalCharges([{ id: 1, description: '', amount: '', selected: false }]);
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Process Another Check-Out
                </button>
              </div>
            </div>
          )}

          {/* Footer */}
          {step !== 'confirmation' && (
            <div className="mt-6 flex justify-end space-x-3">
              {step === 'payment' && (
                <button
                  onClick={() => setStep('details')}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Back
                </button>
              )}
              
              <button
                onClick={onClose}
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              
              {step === 'details' && (
                <button
                  onClick={handleGoToPayment}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Continue to Payment
                </button>
              )}
              
              {step === 'payment' && (
                <button
                  onClick={handleCheckOut}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Complete Check-Out'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default CheckOutModal;