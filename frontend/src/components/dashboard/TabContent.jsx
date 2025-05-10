// frontend/src/components/dashboard/TabContent.jsx
// This file will contain all tab content components for the Dashboard

import React from 'react';
import { LineChart, BarChart, PieChart, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, AlertCircle, Clock, TrendingUp, Percent, Building, Home, Users } from 'lucide-react';

// Overview Tab Content (Already working but incomplete)
export const OverviewTab = ({ mockData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Monthly Occupancy Trends */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Monthly Occupancy Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={mockData.monthlyOccupancy}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="directRate" stroke="#3b82f6" name="Direct Management" />
            <Line type="monotone" dataKey="subLeaseRate" stroke="#8b5cf6" name="Sub-Leased" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Property Distribution */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Property Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={[
                { name: 'Sub-Leased', value: mockData.subLeasedRooms, fill: '#8b5cf6' },
                { name: 'Direct-Managed', value: mockData.directlyManaged, fill: '#3b82f6' },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={60}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Buildings</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">{mockData.buildings.length}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Floors</p>
            <p className="text-xl font-semibold text-gray-800 dark:text-white">15</p>
          </div>
        </div>
      </div>
      
      {/* Sub-Lease Expiry */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sub-Lease Expiry Timeline</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockData.subLeaseExpiry} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="count" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-amber-500 mr-2" />
            <p className="text-amber-700 text-sm font-medium">5 sub-leases expiring within 30 days</p>
          </div>
        </div>
      </div>
      
      {/* Pilgrim Season Analysis */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pilgrim Season Performance</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockData.pilgrimSeasons}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="occupancy" name="Occupancy %" fill="#3b82f6" />
            <Bar yAxisId="right" dataKey="rate" name="Nightly Rate ($)" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Upcoming Activity */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Upcoming Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-md">
            <div className="mr-3 bg-blue-100 p-2 rounded">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{mockData.upcomingCheckIns} Check-ins Today</p>
              <p className="text-xs text-gray-500">8 Standard, 4 Deluxe</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-purple-50 rounded-md">
            <div className="mr-3 bg-purple-100 p-2 rounded">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{mockData.upcomingCheckOuts} Check-outs Today</p>
              <p className="text-xs text-gray-500">5 Standard, 3 Deluxe</p>
            </div>
          </div>
          
          <div className="flex items-center p-3 bg-amber-50 rounded-md">
            <div className="mr-3 bg-amber-100 p-2 rounded">
              <Calendar className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">{mockData.upcomingSubLeaseExpiry} Sub-leases Expiring This Week</p>
              <p className="text-xs text-gray-500">Al Noor Tower (3), Zamzam View (2)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Lease Management Tab Content
export const LeaseManagementTab = ({ mockData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Lease Overview by Building */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Lease Overview by Building</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData.buildings}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rooms" name="Total Rooms" fill="#94a3b8" />
            <Bar dataKey="leased" name="Sub-Leased" fill="#3b82f6" />
            <Bar dataKey="subLeased" name="Direct Management" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Revenue Comparison */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Revenue Streams (Last 6 Months)</h2>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={mockData.revenueComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`}/>
            <Legend />
            <Line type="monotone" dataKey="direct" stroke="#3b82f6" name="Direct Rental" />
            <Line type="monotone" dataKey="subLease" stroke="#8b5cf6" name="Sub-Lease" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Direct Revenue</p>
            <p className="text-xl font-bold text-blue-700">$319,000</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">↑ 12.5%</span>
            </div>
          </div>
          <div className="bg-purple-50 p-3 rounded-md">
            <p className="text-xs text-gray-500">Sub-Lease Revenue</p>
            <p className="text-xl font-bold text-purple-700">$432,000</p>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
              <span className="text-xs text-green-600">↑ 8.3%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-Lease Efficiency */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sub-Lease Efficiency</h2>
        <div className="flex justify-center">
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-700">92%</p>
                <p className="text-xs text-gray-500">Efficiency Rate</p>
              </div>
            </div>
            <svg className="w-40 h-40" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e2e8f0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="8"
                strokeDasharray="282.7"
                strokeDashoffset="22.6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Sub-Lease Cost</p>
            <p className="text-sm font-medium">$220/night</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Average Re-lease Rate</p>
            <p className="text-sm font-medium">$410/night</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className="text-sm font-medium text-green-600">86%</p>
          </div>
        </div>
      </div>
      
      {/* Lease Expiry Calendar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Lease Expiry Timeline (Next 3 Months)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Al Noor Tower, Floor 5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sub-Lease</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 10, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Urgent</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">Renew</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Zamzam View, Floor 3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Direct Lease</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 15, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Warning</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">Renew</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Al Safa Heights, Floor 2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sub-Lease</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">June 5, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">Review</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Al Noor Tower, Floor 3</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Direct Lease</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">July 12, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Stable</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">Monitor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Occupancy Analysis Tab Content
export const OccupancyAnalysisTab = ({ mockData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Occupancy by Room Type */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Occupancy by Room Type</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockData.roomTypes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" name="Total Rooms" fill="#94a3b8" />
            <Bar dataKey="occupancy" name="Occupied" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {mockData.roomTypes.map((type) => (
            <div key={type.name} className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
              <p className="text-xs text-gray-500 dark:text-gray-400">{type.name}</p>
              <p className="text-sm font-semibold">{Math.round(type.occupancy / type.count * 100)}%</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hajj Season Forecast */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Hajj Season Forecast</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={mockData.hajjSeasonForecast}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `${value}%`} />
            <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} name="Expected Occupancy %" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-md">
          <div className="flex">
            <div className="mr-3">
              <CheckCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">Hajj Season Preparation</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Peak season expected occupancy rate of 100%. Pre-booking has reached 68% of total capacity. Recommend securing additional properties within the next 45 days.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Occupancy Heatmap */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Occupancy Heatmap by Building & Floor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockData.buildings.map((building, idx) => (
            <div key={idx} className="border dark:border-gray-700 rounded-md overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-b dark:border-gray-600">
                <h3 className="font-medium text-gray-800 dark:text-white">{building.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{building.rooms} rooms total</p>
              </div>
              <div className="p-3">
                <div className="grid grid-cols-5 gap-2">
                  {[...Array(5)].map((_, floorIdx) => (
                    <div key={floorIdx} className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">F{floorIdx + 1}</p>
                      <div className={`w-full h-6 rounded ${getRandomOccupancyColor()}`}>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-green-500 mr-1"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">90-100%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-green-300 mr-1"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">70-89%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-yellow-300 mr-1"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">50-69%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-red-300 mr-1"></div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">&lt;50%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Performance Insights */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Performance Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Occupancy</h3>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{mockData.occupancyRate}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${mockData.occupancyRate}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Industry Avg: 72%</p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Direct Management</h3>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{29}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${29}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 75%</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Sub-Lease Efficiency</h3>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{94}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${94}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Target: 90%</p>
            </div>
            
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">Performance Summary</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                Sub-leasing is exceeding targets by 4.4%. Direct management needs attention, currently 5% below target. Overall performance is 4% above industry average.
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-md">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">Revenue Growth</h3>
              <p className="text-lg font-bold text-green-600 dark:text-green-400">+12.8%</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Year-over-year revenue increase</p>
            </div>
            
            <div className="p-3 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-md">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white">Sub-Lease Renewals</h3>
              <p className="text-lg font-bold text-purple-600 dark:text-purple-400">92%</p>
              <p className="text-xs text-gray-600 dark:text-gray-300">Renewal rate for existing sub-leases</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Alerts & Notifications Tab Content
export const AlertsAndNotificationsTab = ({ mockData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Alerts & Notifications */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Alerts & Notifications</h2>
        <div className="space-y-3">
          {mockData.upcomingAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-3 rounded-md ${
                alert.status === 'urgent' ? 'bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800' :
                alert.status === 'warning' ? 'bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800' :
                'bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-sm font-medium ${
                    alert.status === 'urgent' ? 'text-red-800 dark:text-red-300' :
                    alert.status === 'warning' ? 'text-amber-800 dark:text-amber-300' :
                    'text-blue-800 dark:text-blue-300'
                  }`}>
                    {alert.type}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{alert.property}</p>
                  <p className="text-xs font-medium mt-1">Due: {new Date(alert.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
                    Snooze
                  </button>
                  <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Action
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Critical Issues */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Critical Issues</h2>
        <div className="space-y-4">
          <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-md">
            <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Sub-Lease Expiry: Al Noor Tower, Floor 5</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              A high-value sub-lease of 15 rooms will expire in 6 days. The sub-lessee has not confirmed renewal.
            </p>
            <div className="mt-2 flex space-x-2">
              <button className="text-xs px-2 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-700">
                Contact Sub-lessee
              </button>
              <button className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
                Prepare New Listing
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 rounded-md">
            <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">Maintenance Required: Zamzam View, Floor 3</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              Multiple guest complaints about air conditioning in 4 rooms. Maintenance needed before the weekend.
            </p>
            <div className="mt-2 flex space-x-2">
              <button className="text-xs px-2 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-300 rounded hover:bg-amber-200 dark:hover:bg-amber-700">
                Schedule Maintenance
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Bulk Check-in: Al Safa Heights</h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              A group of 35 pilgrims will check-in on May 7. Ensure all rooms are prepared.
            </p>
            <div className="mt-2 flex space-x-2">
              <button className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-700">
                Assign Staff
              </button>
              <button className="text-xs px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-600">
                Room Preparations
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-Lease Management */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Sub-Lease Management Overview</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Sub-Lessee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rooms</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Revenue</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Al Barakat Tours</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Al Noor Tower, Floor 5</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Nov 2024 - May 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300">Expiring</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">$182,500</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Kaaba Travels</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Zamzam View, Floor 4</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">12</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Jan 2025 - Dec 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">$124,800</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Haram Pilgrims</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Al Safa Heights, Floor 1-2</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">28</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Feb 2025 - Aug 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">Active</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">$274,400</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      {/* <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow col-span-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800/30 transition">
            <div className="bg-blue-100 dark:bg-blue-800 p-3 rounded-full mb-2">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">New Check-in</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800/30 transition">
            <div className="bg-purple-100 dark:bg-purple-800 p-3 rounded-full mb-2">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Process Check-out</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-800/30 transition">
            <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full mb-2">
              <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">New Sub-Lease</span>
          </button>
          
          <button className="flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-800/30 transition">
            <div className="bg-amber-100 dark:bg-amber-800 p-3 rounded-full mb-2">
              <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Renew Lease</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};

// Utility function for occupancy heatmap
function getRandomOccupancyColor() {
  const colors = [
    'bg-green-500', // 90-100%
    'bg-green-300', // 70-89%
    'bg-yellow-300', // 50-69%
    'bg-red-300', // <50%
  ];
  
  // Weighted randomization to favor higher occupancy
  const weights = [0.4, 0.3, 0.2, 0.1];
  const random = Math.random();
  
  if (random < weights[0]) return colors[0];
  if (random < weights[0] + weights[1]) return colors[1];
  if (random < weights[0] + weights[1] + weights[2]) return colors[2];
  return colors[3];
}