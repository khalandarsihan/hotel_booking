import React, { useState } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { 
  CreditCard, 
  Filter, 
  Download,
  BarChart2 
} from 'lucide-react';
import TransactionModal from '../components/accounts/TransactionModal';
import FinancialSummary from '../components/accounts/FinancialSummary';
import RecentTransactions from '../components/accounts/RecentTransactions';
import LeasePaymentsTab from '../components/accounts/LeasePaymentsTab';
import SubleaseRevenueTab from '../components/accounts/SubleaseRevenueTab';
import AllTransactionsTab from '../components/accounts/AllTransactionsTab';

// Main AccountsPage component
const AccountsPage = () => {
  const { themeStyles } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState('all');
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for transaction modal
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);

  // Handle opening the new transaction modal
  const handleOpenTransactionModal = (transaction = null) => {
    setCurrentTransaction(transaction);
    setIsTransactionModalOpen(true);
  };

  // Handle closing the transaction modal
  const handleCloseTransactionModal = () => {
    setIsTransactionModalOpen(false);
    setCurrentTransaction(null);
  };

  // Handle submitting a new or edited transaction
  const handleTransactionSubmit = (transactionData) => {
    console.log('Transaction submitted:', transactionData);
    // In a real app, this would update the state or make an API call
    // For demo purposes, we'll just log the transaction data
    
    // Here we would update our transactions array
    // setTransactions([...transactions, transactionData]);
  };

  // Mock data for financial summaries
  const financialSummary = {
    totalAmount: 4820000,
    advanceReceived: 3760000,
    pendingAmount: 1060000,
    currentMonthRevenue: 580000,
    leasePayments: {
      total: 2450000,
      pending: 650000,
      paid: 1800000
    },
    subleaseRevenue: {
      total: 2370000,
      pending: 410000,
      paid: 1960000
    }
  };

  // Mock data for transactions
  const transactions = [
    { 
      id: 'TRX001', 
      date: '2025-05-01', 
      type: 'lease-payment', 
      description: 'Monthly Lease Payment to Al Barakat Properties',
      property: 'Al Noor Tower',
      amount: 120000,
      paymentMode: 'bank',
      status: 'completed'
    },
    { 
      id: 'TRX002', 
      date: '2025-05-03', 
      type: 'sublease-received', 
      description: 'Sublease Payment from Haram Pilgrims',
      property: 'Al Noor Tower',
      amount: 85000,
      paymentMode: 'bank',
      status: 'completed'
    },
    { 
      id: 'TRX003', 
      date: '2025-05-05', 
      type: 'lease-payment', 
      description: 'Monthly Lease Payment to Zamzam Properties',
      property: 'Zamzam View',
      amount: 110000,
      paymentMode: 'bank',
      status: 'completed'
    },
    { 
      id: 'TRX004', 
      date: '2025-05-07', 
      type: 'sublease-received', 
      description: 'Sublease Payment from Al Kaaba Tours',
      property: 'Zamzam View',
      amount: 65000,
      paymentMode: 'cash',
      status: 'completed'
    },
    { 
      id: 'TRX005', 
      date: '2025-05-10', 
      type: 'sublease-received', 
      description: 'Sublease Payment from Madina Travels',
      property: 'Al Safa Heights',
      amount: 72000,
      paymentMode: 'bank',
      status: 'pending'
    },
    { 
      id: 'TRX006', 
      date: '2025-05-15', 
      type: 'lease-payment', 
      description: 'Monthly Lease Payment to Al Safa Properties',
      property: 'Al Safa Heights',
      amount: 95000,
      paymentMode: 'bank',
      status: 'pending'
    },
    { 
      id: 'TRX007', 
      date: '2025-05-17', 
      type: 'sublease-received', 
      description: 'Room Booking Payment - Hajj Pilgrims Group A',
      property: 'Al Noor Tower',
      amount: 25000,
      paymentMode: 'cash',
      status: 'completed'
    },
    { 
      id: 'TRX008', 
      date: '2025-05-20', 
      type: 'maintenance', 
      description: 'Emergency AC Repair in 10 Rooms',
      property: 'Al Noor Tower',
      amount: -18000,
      paymentMode: 'cash',
      status: 'completed'
    },
    { 
      id: 'TRX009', 
      date: '2025-05-22', 
      type: 'sublease-received', 
      description: 'Advance Booking Payment for Umrah Groups',
      property: 'Zamzam View',
      amount: 150000,
      paymentMode: 'bank',
      status: 'completed'
    },
    { 
      id: 'TRX010', 
      date: '2025-05-25', 
      type: 'lease-payment', 
      description: 'Additional Fee for Extended Amenities',
      property: 'Al Noor Tower',
      amount: 15000,
      paymentMode: 'bank',
      status: 'pending'
    },
  ];

  // Mock data for properties
  const properties = [
    'Al Noor Tower', 
    'Zamzam View', 
    'Al Safa Heights', 
    'Al Masjid Residency'
  ];

  // Calculate total transaction amounts by type
  const calculateTotals = (transactionList) => {
    return transactionList.reduce((totals, transaction) => {
      if (transaction.type === 'lease-payment') {
        totals.leasePayments += transaction.amount;
      } else if (transaction.type === 'sublease-received') {
        totals.subleaseRevenue += transaction.amount;
      } else if (transaction.type === 'maintenance') {
        totals.expenses += Math.abs(transaction.amount);
      }
      return totals;
    }, { leasePayments: 0, subleaseRevenue: 0, expenses: 0 });
  };

  // Filter transactions based on search and filters
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProperty = selectedPropertyFilter === 'all' || transaction.property === selectedPropertyFilter;
    const matchesPaymentMode = selectedPaymentMode === 'all' || transaction.paymentMode === selectedPaymentMode;
    
    // Date range filter logic would be implemented here
    // For now, we'll return true for all date ranges
    const matchesDateRange = true;
    
    return matchesSearch && matchesProperty && matchesPaymentMode && matchesDateRange;
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Track and manage property finances</p>
          </div>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
              <BarChart2 size={16} className="mr-1" />
              <span>Reports</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
              <Download size={16} className="mr-1" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => handleOpenTransactionModal()}
              className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center">
              <CreditCard size={16} className="mr-1" />
              <span>New Transaction</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'overview' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Financial Overview
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'lease-payments' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('lease-payments')}
            >
              Lease Payments
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'sublease-revenue' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('sublease-revenue')}
            >
              Sublease Revenue
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'transactions' 
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('transactions')}
            >
              All Transactions
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Financial Summary Cards */}
            <FinancialSummary 
              financialSummary={financialSummary} 
              formatCurrency={formatCurrency}
              setActiveTab={setActiveTab}
            />

            {/* Recent Transactions */}
            <RecentTransactions 
              transactions={transactions}
              formatDate={formatDate}
              formatCurrency={formatCurrency}
              setActiveTab={setActiveTab}
            />
          </div>
        )}

        {/* Lease Payments Tab */}
        {activeTab === 'lease-payments' && (
          <LeasePaymentsTab 
            financialSummary={financialSummary}
            formatCurrency={formatCurrency}
            filteredTransactions={filteredTransactions}
            formatDate={formatDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedPropertyFilter={selectedPropertyFilter}
            setSelectedPropertyFilter={setSelectedPropertyFilter}
            selectedPaymentMode={selectedPaymentMode}
            setSelectedPaymentMode={setSelectedPaymentMode}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
            properties={properties}
          />
        )}

        {/* Sublease Revenue Tab */}
        {activeTab === 'sublease-revenue' && (
          <SubleaseRevenueTab 
            financialSummary={financialSummary}
            formatCurrency={formatCurrency}
            filteredTransactions={filteredTransactions}
            formatDate={formatDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedPropertyFilter={selectedPropertyFilter}
            setSelectedPropertyFilter={setSelectedPropertyFilter}
            selectedPaymentMode={selectedPaymentMode}
            setSelectedPaymentMode={setSelectedPaymentMode}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
            properties={properties}
          />
        )}

        {/* All Transactions Tab */}
        {activeTab === 'transactions' && (
          <AllTransactionsTab 
            filteredTransactions={filteredTransactions}
            calculateTotals={calculateTotals}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedPropertyFilter={selectedPropertyFilter}
            setSelectedPropertyFilter={setSelectedPropertyFilter}
            selectedPaymentMode={selectedPaymentMode}
            setSelectedPaymentMode={setSelectedPaymentMode}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
            properties={properties}
          />
        )}
      </div>
      
      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isTransactionModalOpen}
        onClose={handleCloseTransactionModal}
        transaction={currentTransaction}
        onSubmit={handleTransactionSubmit}
      />
    </div>
  );
};

export default AccountsPage;