import React, { useState, useEffect } from 'react';
import { useTheme } from '../ui/ThemeContext';
import { 
  CreditCard, 
  Building, 
  Calendar,
  DollarSign,
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';

const TransactionForm = ({ transaction = null, onSubmit, onCancel }) => {
  const { themeStyles } = useTheme();
  const [formData, setFormData] = useState({
    date: '',
    type: 'lease-payment',
    property: '',
    description: '',
    amount: '',
    paymentMode: 'bank',
    status: 'completed',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Sample properties list
  const properties = [
    'Al Noor Tower', 
    'Zamzam View', 
    'Al Safa Heights', 
    'Al Masjid Residency'
  ];

  // Initialize form if transaction is provided (edit mode)
  useEffect(() => {
    if (transaction) {
      setIsEditMode(true);
      setFormData({
        date: transaction.date || '',
        type: transaction.type || 'lease-payment',
        property: transaction.property || '',
        description: transaction.description || '',
        amount: Math.abs(transaction.amount) || '',
        paymentMode: transaction.paymentMode || 'bank',
        status: transaction.status || 'completed',
        notes: transaction.notes || ''
      });
    } else {
      // Default date to today for new transactions
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setFormData(prevState => ({
        ...prevState,
        date: formattedDate
      }));
    }
  }, [transaction]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear error for field being changed
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.property) {
      newErrors.property = 'Property is required';
    }
    
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid positive amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare transaction data
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount) * (formData.type === 'lease-payment' || formData.type === 'maintenance' ? -1 : 1),
        id: isEditMode ? transaction.id : `TRX${Math.floor(1000 + Math.random() * 9000)}`, // Generate random ID for new transactions
        date: formData.date,
      };
      
      // In a real app, this would be an API call
      // await axios.post('/api/transactions', transactionData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsSuccess(true);
      
      // Call the onSubmit callback with the transaction data
      if (onSubmit) {
        onSubmit(transactionData);
      }
      
      // Reset form after success (for new transaction)
      if (!isEditMode) {
        setFormData({
          date: new Date().toISOString().split('T')[0],
          type: 'lease-payment',
          property: '',
          description: '',
          amount: '',
          paymentMode: 'bank',
          status: 'completed',
          notes: ''
        });
      }
      
      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting transaction:', error);
      setErrors({
        submit: 'There was an error submitting the transaction. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Form Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditMode ? 'Edit Transaction' : 'New Transaction'}
        </h2>
        <button
          onClick={onCancel}
          className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Form Body */}
      <form onSubmit={handleSubmit}>
        <div className="px-6 py-4 space-y-4">
          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Transaction Type*
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className={`flex items-center p-3 rounded-md border ${
                formData.type === 'lease-payment' 
                  ? 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700' 
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}>
                <input 
                  type="radio" 
                  name="type" 
                  value="lease-payment" 
                  checked={formData.type === 'lease-payment'}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 dark:text-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Lease Payment</span>
              </label>
              
              <label className={`flex items-center p-3 rounded-md border ${
                formData.type === 'sublease-received' 
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700' 
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}>
                <input 
                  type="radio" 
                  name="type" 
                  value="sublease-received" 
                  checked={formData.type === 'sublease-received'}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 dark:text-green-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Sublease Revenue</span>
              </label>
              
              <label className={`flex items-center p-3 rounded-md border ${
                formData.type === 'maintenance' 
                  ? 'bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700' 
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}>
                <input 
                  type="radio" 
                  name="type" 
                  value="maintenance" 
                  checked={formData.type === 'maintenance'}
                  onChange={handleChange}
                  className="h-4 w-4 text-red-600 dark:text-red-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Expense/Maintenance</span>
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transaction Date*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`pl-10 block w-full border ${
                    errors.date 
                      ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
              </div>
              {errors.date && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
              )}
            </div>
            
            {/* Property */}
            <div>
              <label htmlFor="property" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Property*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building size={16} className="text-gray-400" />
                </div>
                <select
                  id="property"
                  name="property"
                  value={formData.property}
                  onChange={handleChange}
                  className={`pl-10 block w-full border ${
                    errors.property 
                      ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                >
                  <option value="">Select a property</option>
                  {properties.map(property => (
                    <option key={property} value={property}>{property}</option>
                  ))}
                </select>
              </div>
              {errors.property && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.property}</p>
              )}
            </div>
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description*
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter transaction description"
              className={`block w-full border ${
                errors.description 
                  ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount (₹)*
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <DollarSign size={16} className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`pl-10 block w-full border ${
                    errors.amount 
                      ? 'border-red-300 dark:border-red-600 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
                  } rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                />
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
              )}
            </div>
            
            {/* Payment Mode */}
            <div>
              <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Payment Mode
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CreditCard size={16} className="text-gray-400" />
                </div>
                <select
                  id="paymentMode"
                  name="paymentMode"
                  value={formData.paymentMode}
                  onChange={handleChange}
                  className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Transaction Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <label className={`flex items-center p-3 rounded-md border ${
                formData.status === 'completed' 
                  ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700' 
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}>
                <input 
                  type="radio" 
                  name="status" 
                  value="completed" 
                  checked={formData.status === 'completed'}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 dark:text-green-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Completed</span>
              </label>
              
              <label className={`flex items-center p-3 rounded-md border ${
                formData.status === 'pending' 
                  ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700' 
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
              }`}>
                <input 
                  type="radio" 
                  name="status" 
                  value="pending" 
                  checked={formData.status === 'pending'}
                  onChange={handleChange}
                  className="h-4 w-4 text-amber-600 dark:text-amber-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pending</span>
              </label>
            </div>
          </div>
          
          {/* Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Additional Notes
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                <FileText size={16} className="text-gray-400" />
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="pl-10 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter any additional notes about this transaction"
              ></textarea>
            </div>
          </div>
          
          {/* General form error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
              </div>
            </div>
          )}
          
          {/* Success message */}
          {isSuccess && (
            <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
              <div className="flex">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-green-600 dark:text-green-400">
                  Transaction {isEditMode ? 'updated' : 'created'} successfully!
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Form Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : isEditMode ? 'Update Transaction' : 'Create Transaction'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;