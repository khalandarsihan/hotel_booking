import React, { useState } from 'react';  
import { LineChart, BarChart, PieChart, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  
import { CalendarDays, Building, Users, Bed, Home, Clock, Calendar, TrendingUp, AlertCircle, CheckCircle, Percent } from 'lucide-react';
import { useTheme } from '../components/ui/ThemeContext';

// Demo/placeholder component based on the example
const Dashboard = () => {  
  const [activeTab, setActiveTab] = useState('overview');
  const { themeStyles } = useTheme();
    
  // Sample data - in a real app, this would come from an API
  const mockData = {
    occupancyRate: 76,
    totalRooms: 230,
    availableRooms: 55,
    leasedRooms: 175,
    // More data would be defined here
  };

  // Calculate example statistics
  const directOccupancyRate = 71; // Would be calculated from real data

  return (  
    <div className={`min-h-screen ${themeStyles.background}`}>  
      {/* Header */}  
      <header className="bg-white shadow-md">  
        <div className="mx-auto px-4 py-6 flex justify-between items-center">  
          <div>  
            <h1 className="text-2xl font-bold text-gray-800">Mecca Pilgrim Accommodation Manager</h1>  
            <p className="text-gray-500 text-sm">Dashboard for Al Barakat Hotel Group</p>  
          </div>  
          <div className="flex items-center gap-4">  
            <div className="bg-emerald-100 px-3 py-1 rounded-full text-emerald-700 text-sm font-medium flex items-center">  
              <CalendarDays className="w-4 h-4 mr-1" />  
              May 4, 2025  
            </div>  
            <div className="flex items-center gap-2 text-sm">  
              <span className="font-medium text-gray-700">Hajj Season:</span>  
              <span className="text-amber-600 font-medium">128 Days Away</span>  
            </div>  
          </div>  
        </div>  
      </header>  
        
      {/* Main Content */}  
      <main className="max-w-7xl mx-auto py-6 px-4">  
        {/* KPI Cards */}  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">  
          <div className="bg-white rounded-lg shadow p-4">  
            <div className="flex justify-between items-start">  
              <div>  
                <p className="text-gray-500 text-sm">Total Leased Rooms</p>  
                <p className="text-2xl font-bold text-gray-800">{mockData.leasedRooms}</p>  
                <div className="flex items-center mt-1">  
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">  
                    {mockData.occupancyRate}% Occupied  
                  </span>  
                </div>  
              </div>  
              <span className="bg-blue-100 p-2 rounded-md">  
                <Building className="w-5 h-5 text-blue-600" />  
              </span>  
            </div>  
          </div>  
            
          <div className="bg-white rounded-lg shadow p-4">  
            <div className="flex justify-between items-start">  
              <div>  
                <p className="text-gray-500 text-sm">Available Rooms</p>  
                <p className="text-2xl font-bold text-gray-800">{mockData.availableRooms}</p>  
                <div className="flex items-center mt-1">  
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">  
                    Ready to Book  
                  </span>  
                </div>  
              </div>  
              <span className="bg-green-100 p-2 rounded-md">  
                <Home className="w-5 h-5 text-green-600" />  
              </span>  
            </div>  
          </div>  
        </div>  
          
        {/* Navigation Tabs */}  
        <div className="bg-white rounded-lg shadow mb-6">  
          <div className="flex border-b">  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}  
              onClick={() => setActiveTab('overview')}  
            >  
              Overview  
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'bookings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}  
              onClick={() => setActiveTab('bookings')}  
            >  
              Bookings  
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'rooms' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}  
              onClick={() => setActiveTab('rooms')}  
            >  
              Room Management  
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'reports' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}  
              onClick={() => setActiveTab('reports')}  
            >  
              Reports  
            </button>  
          </div>  
        </div>  
          
        {/* Tab Content - This is a simplified placeholder */}  
        {activeTab === 'overview' && (  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">  
            {/* Monthly Booking Trends */}  
            <div className="bg-white p-4 rounded-lg shadow col-span-2">  
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Booking Trends</h2>  
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-400">Chart will be displayed here</p>
              </div>
            </div>  
              
            {/* Room Status */}  
            <div className="bg-white p-4 rounded-lg shadow">  
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Room Status</h2>  
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-400">Status chart will be displayed here</p>
              </div>
            </div>  
          </div>  
        )}
        
        {/* Other tabs would have their own content */}
        {activeTab !== 'overview' && (
          <div className="flex justify-center items-center p-8">
            <p className="text-lg text-gray-400">Content for the {activeTab} tab will be implemented here</p>
          </div>
        )}
      </main>  
    </div>  
  );  
};

export default Dashboard;