import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { Building, MapPin, Plus, Search, Filter, Home, Users, Bed, Calendar } from 'lucide-react';

const PropertiesPage = () => {
  const { themeStyles } = useTheme();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock fetch properties
  useEffect(() => {
    // In a real app, this would be an API call
    const mockProperties = [
      {
        id: '1',
        name: 'Al Noor Tower',
        location: 'Mecca, Saudi Arabia',
        type: 'Hotel',
        rooms: 80,
        occupancy: 85,
        status: 'active',
        image: '/assets/hotel_booking/images/al_noor_tower.jpg',
        description: 'Premium accommodation with modern amenities, located 500 meters from the Holy Mosque.',
        features: ['Free WiFi', 'Air Conditioning', 'Prayer Rooms', 'Daily Housekeeping', 'Restaurant'],
        revenue: {
          monthly: 342000,
          trend: '+8.6%'
        }
      },
      {
        id: '2',
        name: 'Zamzam View',
        location: 'Mecca, Saudi Arabia',
        type: 'Apartment Complex',
        rooms: 60,
        occupancy: 78,
        status: 'active',
        image: '/assets/hotel_booking/images/zamzam_view.jpg',
        description: 'Comfortable accommodation with direct view of the Holy Mosque.',
        features: ['Free WiFi', 'Air Conditioning', '24/7 Reception', 'Laundry Service'],
        revenue: {
          monthly: 284000,
          trend: '+5.2%'
        }
      },
      {
        id: '3',
        name: 'Al Safa Heights',
        location: 'Mecca, Saudi Arabia',
        type: 'Residential Building',
        rooms: 90,
        occupancy: 65,
        status: 'maintenance',
        image: '/assets/hotel_booking/images/al_safa_heights.jpg',
        description: 'Spacious apartments suitable for families, located within 1km of the Holy Mosque.',
        features: ['Family Rooms', 'Kitchen', 'Living Area', 'Prayer Area'],
        revenue: {
          monthly: 176000,
          trend: '-2.3%'
        }
      },
      {
        id: '4',
        name: 'Al Masjid Residency',
        location: 'Medina, Saudi Arabia',
        type: 'Hotel',
        rooms: 55,
        occupancy: 92,
        status: 'active',
        image: '/assets/hotel_booking/images/al_masjid_residency.jpg',
        description: 'Premium hotel located near the Prophet\'s Mosque in Medina.',
        features: ['Free WiFi', 'Restaurant', 'Conference Room', 'Airport Shuttle'],
        revenue: {
          monthly: 298000,
          trend: '+12.1%'
        }
      }
    ];

    // Filter properties based on search and filter
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 500);
  }, []);

  // Filter properties based on search term and status filter
  const filteredProperties = properties.filter(property => {
    const matchesSearch = 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'maintenance':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
      case 'inactive':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center`}>
        <div className="animate-pulse flex flex-col items-center">
          <Building className="h-12 w-12 text-blue-300 dark:text-blue-700 mb-4" />
          <div className="h-4 bg-blue-200 dark:bg-blue-700 rounded w-32 mb-4"></div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Property Management</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your accommodation properties</p>
          </div>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center">
              <Plus size={16} className="mr-1" />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="maintenance">Under Maintenance</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center">
              <Filter size={18} className="mr-2" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {filteredProperties.map((property) => (
            <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
                {/* Placeholder for image - in a real app this would use the property.image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building size={48} className="text-gray-600 dark:text-gray-400" />
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      <a href={`/property-details?id=${property.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                        {property.name}
                      </a>
                    </h3>
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <MapPin size={14} className="mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(property.status)}`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {property.description}
                </p>
                
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div className="flex items-center">
                    <Home size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                    <span>{property.type}</span>
                  </div>
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                    <span>{property.rooms} Rooms</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                    <span>{property.occupancy}% Occupied</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1 text-gray-500 dark:text-gray-400" />
                    <span>Available Now</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Revenue</p>
                    <div className="flex items-center">
                      <span className="text-base font-semibold text-gray-900 dark:text-white">₹{property.revenue.monthly.toLocaleString()}</span>
                      <span className={`ml-2 text-xs ${property.revenue.trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {property.revenue.trend}
                      </span>
                    </div>
                  </div>
                  <a 
                    href={`/property-details?id=${property.id}`}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                  >
                    View Details →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
            <Building size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No properties found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700">
              Add a New Property
            </button>
          </div>
        )}
        
        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing <span className="font-medium">{filteredProperties.length}</span> of <span className="font-medium">{properties.length}</span> properties
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
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;