import React, { useState, useEffect } from 'react';
import { X, Search, Building, Calendar, CreditCard, CheckCircle } from 'lucide-react';

const SubLeaseRenewalModal = ({ onClose, initialSublease = null }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(initialSublease ? 'details' : 'search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSublease, setSelectedSublease] = useState(initialSublease);
  const [formData, setFormData] = useState({
    newEndDate: '',
    rateChange: '0',
    newRate: '',
    paymentMethod: 'bank_transfer',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Mock subleases data
  const mockSubleases = [
    {
      id: 'SL1001',
      propertyName: 'Al Noor Tower - Level 3',
      tenantName: 'MindSpark Technologies',
      startDate: '2024-01-15',
      endDate: '2025-07-15',
      rooms: 25,
      rate: 110000,
      status: 'active',
      paymentStatus: 'current',
      parentLeaseId: 'L1001'
    },
    {
      id: 'SL1002',
      propertyName: 'Zamzam View - West Wing',
      tenantName: 'HealthFirst Pharmacy',
      startDate: '2024-02-01',
      endDate: '2025-08-01',
      rooms: 15,
      rate: 75000,
      status: 'active',
      paymentStatus: 'current',
      parentLeaseId: 'L1002'
    },
    {
      id: 'SL1003',
      propertyName: 'Al Safa Heights - Floor 5',
      tenantName: 'GlobalConnect Solutions',
      startDate: '2024-03-01',
      endDate: '2025-06-15',
      rooms: 30,
      rate: 90000,
      status: 'active',
      paymentStatus: 'overdue',
      parentLeaseId: 'L1003'
    },
  ];

  // Initialize form if initial sublease is provided
  useEffect(() => {
    if (initialSublease) {
      const currentEndDate = new Date(initialSublease.endDate);
      const newEndDate = new Date(currentEndDate);
      newEndDate.setFullYear(newEndDate.getFullYear() + 1);
      
      setFormData({
        ...formData,
        newEndDate: newEndDate.toISOString().split('T')[0],
        newRate: initialSublease.rate
      });
    }
  }, [initialSublease]);

  // Handle search
  useEffect(() => {
    if (searchQuery.length > 2) {
      // In a real app, this would be an API call
      const filteredResults = mockSubleases.filter(
        sublease => 
          sublease.status === 'active' && 
          (sublease.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           sublease.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           sublease.tenantName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Select sublease
  const handleSelectSublease = (sublease) => {
    setSelectedSublease(sublease);
    
    // Set default end date to 1 year after current end date
    const currentEndDate = new Date(sublease.endDate);
    const newEndDate = new Date(currentEndDate);
    newEndDate.setFullYear(newEndDate.getFullYear() + 1);
    
    setFormData({
      ...formData,
      newEndDate: newEndDate.toISOString().split('T')[0],
      newRate: sublease.rate // Default to current rate
    });
    
    setStep('details');
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error if field is updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
    
    // If rate change is updated, recalculate payment amount
    if (name === 'rateChange' && selectedSublease) {
      const rateChange = parseFloat(value) || 0;
      const newRate = selectedSublease.rate * (1 + rateChange / 100);
      setFormData(prev => ({
        ...prev,
        newRate: newRate.toFixed(0)
      }));
    }
  };

  // Go to payment step
  const handleGoToPayment = () => {
    // Validate details
    const newErrors = {};
    
    if (!formData.newEndDate) {
      newErrors.newEndDate = 'New end date is required';
    } else if (new Date(formData.newEndDate) <= new Date(selectedSublease.endDate)) {
      newErrors.newEndDate = 'New end date must be after current end date';
    }
    
    if (!formData.newRate) {
      newErrors.newRate = 'Rate is required';
    } else if (isNaN(formData.newRate) || parseFloat(formData.newRate) <= 0) {
      newErrors.newRate = 'Please enter a valid rate amount';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setStep('payment');
    }
  };

  // Process sublease renewal
  const handleRenewSublease = () => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setStep('confirmation');
      
      // In a real app, you would update the sublease details here
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

  // Calculate lease extension in months
  const calculateExtension = () => {
    if (!selectedSublease || !formData.newEndDate) return 0;
    
    const currentEnd = new Date(selectedSublease.endDate);
    const newEnd = new Date(formData.newEndDate);
    
    // Calculate difference in months
    const monthDiff = (newEnd.getFullYear() - currentEnd.getFullYear()) * 12 + 
                      (newEnd.getMonth() - currentEnd.getMonth());
    
    return monthDiff;
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
              {step === 'search' && 'Renew Sublease Agreement'}
              {step === 'details' && 'Sublease Renewal Details'}
              {step === 'payment' && 'Renewal Payment'}
              {step === 'confirmation' && 'Sublease Renewal Successful'}
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
                  Search for a property or sublease ID to renew:
                </p>
              </div>

              <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter property name or sublease ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-4 max-h-60 overflow-y-auto">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select a sublease to renew:
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((sublease) => (
                      <div
                        key={sublease.id}
                        className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleSelectSublease(sublease)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{sublease.propertyName}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {sublease.tenantName}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {sublease.id}
                          </div>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Expires: {formatDate(sublease.endDate)}
                          </div>
                          <div className={`text-xs px-2 py-0.5 rounded-full ${
                            sublease.paymentStatus === 'current' 
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                              : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                          }`}>
                            {sublease.paymentStatus === 'current' ? 'Payments Current' : 'Payment Overdue'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchQuery.length > 2 && searchResults.length === 0 && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">No active subleases found.</p>
                </div>
              )}
            </div>
          )}

          {/* Details Step */}
          {step === 'details' && selectedSublease && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{selectedSublease.propertyName}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sublease ID: {selectedSublease.id}</p>
                  </div>
                  <div className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    Active
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Current Period:</p>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {formatDate(selectedSublease.startDate)} - {formatDate(selectedSublease.endDate)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Rate:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{formatCurrency(selectedSublease.rate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Rooms:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedSublease.rooms} rooms</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Tenant:</p>
                    <p className="text-sm text-gray-900 dark:text-white">{selectedSublease.tenantName}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="newEndDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New End Date*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="newEndDate"
                      name="newEndDate"
                      value={formData.newEndDate}
                      onChange={handleChange}
                      min={selectedSublease.endDate}
                      className={`pl-10 block w-full rounded-md border ${
                        errors.newEndDate ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    />
                  </div>
                  {errors.newEndDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newEndDate}</p>}
                </div>

                {formData.newEndDate && (
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Sublease Extension: <span className="font-medium">{calculateExtension()} months</span>
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="rateChange" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rate Change (%)
                  </label>
                  <input
                    type="number"
                    id="rateChange"
                    name="rateChange"
                    value={formData.rateChange}
                    onChange={handleChange}
                    step="0.5"
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter rate change percentage"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Enter positive value for increase, negative for decrease. E.g. 5 for 5% increase.
                  </p>
                </div>

                <div>
                  <label htmlFor="newRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    New Monthly Rate (₹)*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="newRate"
                      name="newRate"
                      value={formData.newRate}
                      onChange={handleChange}
                      min="0"
                      step="1000"
                      className={`pl-10 block w-full rounded-md border ${
                        errors.newRate ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                      } shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                      placeholder="Enter new monthly rate"
                    />
                  </div>
                  {errors.newRate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.newRate}</p>}
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={2}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Any additional notes for this renewal"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {step === 'payment' && selectedSublease && (
            <div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Renewal Summary</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Property:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{selectedSublease.propertyName}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tenant:</span>
                    <span className="text-gray-900 dark:text-white">{selectedSublease.tenantName}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Current End Date:</span>
                    <span className="text-gray-900 dark:text-white">{formatDate(selectedSublease.endDate)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">New End Date:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{formatDate(formData.newEndDate)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Extension Period:</span>
                    <span className="text-gray-900 dark:text-white">{calculateExtension()} months</span>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Current Monthly Rate:</span>
                      <span className="text-gray-900 dark:text-white">{formatCurrency(selectedSublease.rate)}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Rate Change:</span>
                      <span className={`${
                        parseFloat(formData.rateChange) > 0 
                          ? 'text-red-600 dark:text-red-400' 
                          : parseFloat(formData.rateChange) < 0 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {parseFloat(formData.rateChange) > 0 ? '+' : ''}{formData.rateChange}%
                      </span>
                    </div>
                    
                    <div className="flex justify-between text-sm font-medium mt-1">
                      <span className="text-gray-700 dark:text-gray-300">New Monthly Rate:</span>
                      <span className="text-gray-900 dark:text-white">{formatCurrency(formData.newRate)}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-gray-700 dark:text-gray-300">Total Contract Value:</span>
                      <span className="text-gray-900 dark:text-white">
                        {formatCurrency(parseFloat(formData.newRate) * calculateExtension())}
                      </span>
                    </div>
                  </div>
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
                  <option value="check">Check</option>
                  <option value="cash">Cash</option>
                </select>
              </div>

              <div className="mt-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any additional notes for this renewal"
                ></textarea>
              </div>
            </div>
          )}

          {/* Confirmation Step */}
          {step === 'confirmation' && (
            <div className="text-center py-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Sublease Renewal Successful</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The sublease for {selectedSublease?.propertyName} has been successfully renewed until {formatDate(formData.newEndDate)}.
              </p>
              
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md inline-block text-left">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  New monthly rate: {formatCurrency(formData.newRate)}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Extended for: {calculateExtension()} months
                </p>
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
                    setStep('search');
                    setSearchQuery('');
                    setSelectedSublease(null);
                    setFormData({
                      newEndDate: '',
                      rateChange: '0',
                      newRate: '',
                      paymentMethod: 'bank_transfer',
                      notes: ''
                    });
                    setSuccess(false);
                  }}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Renew Another Sublease
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
                  onClick={handleRenewSublease}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Renew Sublease'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubLeaseRenewalModal;