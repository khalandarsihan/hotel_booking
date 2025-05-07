import React, { useState, useEffect } from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { Building, MapPin, Phone, Mail, Users, Bed, Home, Calendar, ChevronLeft, Edit, BarChart, Plus } from 'lucide-react';

const PropertyDetails = ({ propertyId }) => {
  const { themeStyles } = useTheme();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  // Mock fetch property details
  useEffect(() => {
    // In a real app, this would be an API call
    const mockProperty = {
      id: propertyId,
      name: propertyId === '1' ? 'Al Noor Tower' : 'Zamzam View',
      address: {
        street: propertyId === '1' ? '123 Malik Road' : '456 Haram Street',
        city: 'Mecca',
        state: 'Makkah Province',
        country: 'Saudi Arabia',
        zipCode: propertyId === '1' ? '12345' : '67890',
      },
      contact: {
        phone: '+966 12 345 6789',
        email: `info@${propertyId === '1' ? 'alnoortower' : 'zamzamview'}.com`,
        manager: propertyId === '1' ? 'Ahmed Al-Faisal' : 'Mohammed Salim',
      },
      details: {
        totalRooms: propertyId === '1' ? 80 : 60,
        floors: propertyId === '1' ? 8 : 6,
        facilities: [
          'Free WiFi',
          'Air Conditioning',
          'Prayer Rooms',
          'Daily Housekeeping',
          '24/7 Reception',
          'Restaurant',
          'Laundry Service',
        ],
        description: propertyId === '1' 
          ? 'Al Noor Tower is a premium accommodation located just 500 meters from the Holy Mosque. The property offers comfortable rooms with modern amenities to ensure pilgrims have a peaceful stay during their spiritual journey.'
          : 'Zamzam View is a comfortable accommodation option with a direct view of the Holy Mosque. The property provides all essential amenities to make your pilgrimage a memorable experience.',
        constructed: propertyId === '1' ? 2018 : 2015,
        lastRenovated: propertyId === '1' ? 2023 : 2022,
      },
      stats: {
        occupancyRate: propertyId === '1' ? 85 : 78,
        averageRate: propertyId === '1' ? 180 : 150,
        revenue: {
          thisMonth: propertyId === '1' ? 342000 : 284000,
          lastMonth: propertyId === '1' ? 315000 : 276000,
        },
      },
      rooms: [
        { 
          type: 'Standard', 
          count: propertyId === '1' ? 50 : 40, 
          occupied: propertyId === '1' ? 42 : 30,
          rate: propertyId === '1' ? 120 : 110,
        },
        { 
          type: 'Deluxe', 
          count: propertyId === '1' ? 20 : 15, 
          occupied: propertyId === '1' ? 18 : 12,
          rate: propertyId === '1' ? 180 : 160, 
        },
        { 
          type: 'Suite', 
          count: propertyId === '1' ? 10 : 5, 
          occupied: propertyId === '1' ? 8 : 5,
          rate: propertyId === '1' ? 250 : 220, 
        },
      ],
    };

    // Simulate API loading time
    setTimeout(() => {
      setProperty(mockProperty);
      setLoading(false);
    }, 500);
  }, [propertyId]);

  if (loading) {
    return (
      <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center`}>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-2"></div>
                <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="flex items-center">
            <a href="/properties" className="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              <ChevronLeft size={20} />
            </a>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{property.name}</h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{property.address.city}, {property.address.country}</span>
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
              <Edit size={16} className="mr-1" />
              <span>Edit Property</span>
            </button>
            <button className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center">
              <BarChart size={16} className="mr-1" />
              <span>View Reports</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'details' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('details')}  
            >  
              Details
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'rooms' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('rooms')}  
            >  
              Rooms
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'bookings' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('bookings')}  
            >  
              Bookings
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'reports' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('reports')}  
            >  
              Reports
            </button>  
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'details' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Property Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Property Information</h2>
              
              <div className="prose dark:prose-invert prose-sm max-w-none mb-6">
                <p>{property.details.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Address</h3>
                  <address className="not-italic">
                    <p className="text-gray-600 dark:text-gray-300">{property.address.street}</p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {property.address.city}, {property.address.state}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {property.address.zipCode}, {property.address.country}
                    </p>
                  </address>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Phone size={16} className="mr-2 flex-shrink-0" />
                      <span>{property.contact.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Mail size={16} className="mr-2 flex-shrink-0" />
                      <span>{property.contact.email}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users size={16} className="mr-2 flex-shrink-0" />
                      <span>Manager: {property.contact.manager}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Rooms</h4>
                  <div className="flex items-center">
                    <Bed size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{property.details.totalRooms}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Floors</h4>
                  <div className="flex items-center">
                    <Building size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{property.details.floors}</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Occupancy</h4>
                  <div className="flex items-center">
                    <Users size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{property.stats.occupancyRate}%</span>
                  </div>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Facilities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.details.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      <span className="text-gray-600 dark:text-gray-300">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <hr className="my-6 border-gray-200 dark:border-gray-700" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Property Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span>Constructed: {property.details.constructed}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar size={16} className="mr-2 flex-shrink-0" />
                      <span>Last Renovated: {property.details.lastRenovated}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Property Stats */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Performance Overview</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Occupancy Rate</h3>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{property.stats.occupancyRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${property.stats.occupancyRate}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Industry Avg: 72%</p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Average Nightly Rate</h3>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">₹{property.stats.averageRate}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(property.stats.averageRate / 300) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Market Avg: ₹160</p>
                  </div>
                </div>
                
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Revenue</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">This Month</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">₹{property.stats.revenue.thisMonth.toLocaleString()}</p>
                      <div className="flex items-center mt-1 text-green-600 dark:text-green-400 text-xs">
                        <span className="font-medium">↑ 8.6%</span>
                        <span className="ml-1">from last month</span>
                      </div>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Last Month</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">₹{property.stats.revenue.lastMonth.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Room Availability</h2>
                
                <div className="space-y-4">
                  {property.rooms.map((roomType, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">{roomType.type}</h3>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {roomType.occupied} / {roomType.count}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(roomType.occupied / roomType.count) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {roomType.count - roomType.occupied} available
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ₹{roomType.rate}/night
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Room Management Tab */}
        {activeTab === 'rooms' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Room Management</h2>
              <button className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center">
                <Plus size={16} className="mr-1" />
                <span>Add Room</span>
              </button>
            </div>
            
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
                      Floor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
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
                  {/* Sample room rows - in a real app, this would be dynamic */}
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">101</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Standard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">₹120</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">Edit</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">102</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Standard</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">1</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                        Occupied
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">₹120</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">Edit</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">201</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">Deluxe</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">2</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                        Available
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">₹180</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">Edit</button>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300">Delete</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing <span className="font-medium">3</span> of <span className="font-medium">{property.details.totalRooms}</span> rooms
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
        )}
        
        {/* Placeholder for other tabs */}
        {(activeTab === 'bookings' || activeTab === 'reports') && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {activeTab === 'bookings' ? 'Booking Management' : 'Reports & Analytics'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                This section is under development. Check back soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;