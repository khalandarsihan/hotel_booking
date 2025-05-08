import React from 'react';

const TransactionFilters = ({
  selectedPropertyFilter,
  setSelectedPropertyFilter,
  selectedPaymentMode,
  setSelectedPaymentMode,
  selectedDateRange,
  setSelectedDateRange,
  properties
}) => {
  return (
    <div className="flex space-x-4">
      <div>
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedPropertyFilter}
          onChange={(e) => setSelectedPropertyFilter(e.target.value)}
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
          value={selectedPaymentMode}
          onChange={(e) => setSelectedPaymentMode(e.target.value)}
        >
          <option value="all">All Payment Modes</option>
          <option value="bank">Bank Transfer</option>
          <option value="cash">Cash</option>
        </select>
      </div>

      <div>
        <select
          className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={selectedDateRange}
          onChange={(e) => setSelectedDateRange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionFilters;