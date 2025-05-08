import React from 'react';
import { Search } from 'lucide-react';
import TransactionFilters from './TransactionFilters';

const LeasePaymentsTab = ({ 
  financialSummary, 
  formatCurrency, 
  filteredTransactions, 
  formatDate,
  searchTerm,
  setSearchTerm,
  selectedPropertyFilter,
  setSelectedPropertyFilter,
  selectedPaymentMode,
  setSelectedPaymentMode,
  selectedDateRange,
  setSelectedDateRange,
  properties
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lease Payment Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Lease Payments</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{formatCurrency(financialSummary.leasePayments.total)}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Paid to Property Owners</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">{formatCurrency(financialSummary.leasePayments.paid)}</p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Payments</p>
            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{formatCurrency(financialSummary.leasePayments.pending)}</p>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">Property-wise Lease Distribution</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">Al Noor Tower</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(850000)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">Zamzam View</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(720000)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">Al Safa Heights</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(540000)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">Al Masjid Residency</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(340000)}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and filters for lease payments */}
        <div className="mb-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search lease payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <TransactionFilters 
              selectedPropertyFilter={selectedPropertyFilter}
              setSelectedPropertyFilter={setSelectedPropertyFilter}
              selectedPaymentMode={selectedPaymentMode}
              setSelectedPaymentMode={setSelectedPaymentMode}
              selectedDateRange={selectedDateRange}
              setSelectedDateRange={setSelectedDateRange}
              properties={properties}
            />
          </div>
        </div>

        {/* Lease payment transactions table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTransactions
                .filter(transaction => transaction.type === 'lease-payment')
                .map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {transaction.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.paymentMode === 'bank' 
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' 
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        }`}>
                        {transaction.paymentMode === 'bank' ? 'Bank Transfer' : 'Cash'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.status === 'completed' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                        }`}>
                        {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-purple-600 dark:text-purple-400">
                      -{formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeasePaymentsTab;