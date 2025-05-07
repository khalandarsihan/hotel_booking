import React, { useState } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { Home, Filter, Plus, Search, Edit, Trash, Check, X } from 'lucide-react';

const RoomManagement = () => {
  const { themeStyles } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for rooms
  const mockRooms = [
    { id: 1, number: '101', type: 'Standard', property: 'Al Noor Tower', status: 'available', floor: 1, capacity: 2, rate: 120 },
    { id: 2, number: '102', type: 'Standard', property: 'Al Noor Tower', status: 'occupied', floor: 1, capacity: 2, rate: 120 },
    { id: 3, number: '201', type: 'Deluxe', property: 'Al Noor Tower', status: 'available', floor: 2, capacity: 3, rate: 180 },
    { id: 4, number: '301', type: 'Suite', property: 'Al Noor Tower', status: 'maintenance', floor: 3, capacity: 4, rate: 250 },
    { id: 5, number: '101', type: 'Standard', property: 'Zamzam View', status: 'available', floor: 1, capacity: 2, rate: 110 },
    { id: 6, number: '102', type: 'Standard', property: 'Zamzam View', status: 'occupied', floor: 1, capacity: 2, rate: 110 },
    { id: 7, number: '201', type: 'Deluxe', property: 'Zamzam View', status: 'occupied', floor: 2, capacity: 3, rate: 160 },
    { id: 8, number: '301', type: 'Suite', property: 'Zamzam View', status: 'available', floor: 3, capacity: 4, rate: 220 },
  ];

  // Mock properties list
  const properties = ['Al Noor Tower', 'Zamzam View'];
  
  // Filter rooms based on search and filters
  const filteredRooms = mockRooms.filter(room => {
    const matchesSearch = 
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.property.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProperty = selectedProperty === 'all' || room.property === selectedProperty;
    const matchesStatus = selectedStatus === 'all' || room.status === selectedStatus;
    
    return matchesSearch && matchesProperty && matchesStatus;
  });

  // Get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'occupied':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'maintenance':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Room Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your property rooms</p>
          </div>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center">
              <Plus size={16} className="mr-1" />
              <span>Add New Room</span>
            </button>
          </div>
        </header>

        {/* Filters and search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search rooms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-4">
              <div>
                <label htmlFor="property-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Property
                </label>
                <select
                  id="property-filter"
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
                <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Rooms table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Room Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Floor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Capacity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Rate (₹)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredRooms.map((room) => (
                  <tr key={`${room.property}-${room.number}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {room.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {room.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {room.property}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {room.floor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(room.status)}`}>
                        {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {room.capacity} {room.capacity === 1 ? 'person' : 'people'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      ₹{room.rate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">
                          <Trash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="py-8 text-center text-gray-500 dark:text-gray-400">
              No rooms match your search criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{filteredRooms.length}</span> out of <span className="font-medium">{mockRooms.length}</span> rooms
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;