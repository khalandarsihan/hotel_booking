import React from 'react';
import { Calendar } from 'lucide-react';

const FinancialSummary = ({ financialSummary, formatCurrency, setActiveTab }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Total Financials</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Total Amount</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(financialSummary.totalAmount)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Advance Received</span>
              <span className="text-lg font-medium text-green-600 dark:text-green-400">{formatCurrency(financialSummary.advanceReceived)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(financialSummary.advanceReceived / financialSummary.totalAmount) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Pending Amount</span>
              <span className="text-lg font-medium text-amber-600 dark:text-amber-400">{formatCurrency(financialSummary.pendingAmount)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(financialSummary.pendingAmount / financialSummary.totalAmount) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Current Month Revenue</p>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">{formatCurrency(financialSummary.currentMonthRevenue)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Lease Payments</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Total Lease Amount</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(financialSummary.leasePayments.total)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Paid to Property Owners</span>
              <span className="text-lg font-medium text-green-600 dark:text-green-400">{formatCurrency(financialSummary.leasePayments.paid)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(financialSummary.leasePayments.paid / financialSummary.leasePayments.total) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Pending Payments</span>
              <span className="text-lg font-medium text-amber-600 dark:text-amber-400">{formatCurrency(financialSummary.leasePayments.pending)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(financialSummary.leasePayments.pending / financialSummary.leasePayments.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => setActiveTab('lease-payments')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            View Lease Details →
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Sublease Revenue</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Total Expected Revenue</span>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{formatCurrency(financialSummary.subleaseRevenue.total)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Received from Tenants</span>
              <span className="text-lg font-medium text-green-600 dark:text-green-400">{formatCurrency(financialSummary.subleaseRevenue.paid)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(financialSummary.subleaseRevenue.paid / financialSummary.subleaseRevenue.total) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Pending Collections</span>
              <span className="text-lg font-medium text-amber-600 dark:text-amber-400">{formatCurrency(financialSummary.subleaseRevenue.pending)}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${(financialSummary.subleaseRevenue.pending / financialSummary.subleaseRevenue.total) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button 
            onClick={() => setActiveTab('sublease-revenue')}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            View Sublease Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;