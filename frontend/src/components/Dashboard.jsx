// frontend/src/components/Dashboard.jsx
import React, { useState } from 'react';  
import { CalendarDays, Building, Users, Bed, Home } from 'lucide-react';
import { useTheme } from './ui/ThemeContext';
import { OverviewTab, LeaseManagementTab, OccupancyAnalysisTab, AlertsAndNotificationsTab } from './dashboard/TabContent';

// Dashboard Component  
const Dashboard = () => {  
  const [activeTab, setActiveTab] = useState('overview');  
  const { themeStyles } = useTheme();
  
  // Mock Data  
  const mockData = {  
    occupancyRate: 76,  
    totalRooms: 230,  
    availableRooms: 55,  
    leasedRooms: 175,  
    subLeasedRooms: 98,  
    directlyManaged: 77,  
    upcomingCheckIns: 12,  
    upcomingCheckOuts: 8,  
    upcomingSubLeaseExpiry: 5,  
    roomTypes: [  
      { name: 'Standard', count: 120, occupancy: 98 },  
      { name: 'Deluxe', count: 70, occupancy: 52 },  
      { name: 'Suite', count: 40, occupancy: 25 }  
    ],  
    buildings: [  
      { name: 'Al Noor Tower', rooms: 80, leased: 80, subLeased: 45 },  
      { name: 'Zamzam View', rooms: 60, leased: 40, subLeased: 25 },  
      { name: 'Al Safa Heights', rooms: 90, leased: 55, subLeased: 28 }  
    ],  
    monthlyOccupancy: [  
      { month: 'Jan', directRate: 65, subLeaseRate: 85 },  
      { month: 'Feb', directRate: 72, subLeaseRate: 90 },  
      { month: 'Mar', directRate: 78, subLeaseRate: 92 },  
      { month: 'Apr', directRate: 85, subLeaseRate: 95 },  
      { month: 'May', directRate: 95, subLeaseRate: 98 },  
      { month: 'Jun', directRate: 60, subLeaseRate: 88 },  
      { month: 'Jul', directRate: 72, subLeaseRate: 90 },  
      { month: 'Aug', directRate: 90, subLeaseRate: 95 },  
      { month: 'Sep', directRate: 95, subLeaseRate: 98 },  
      { month: 'Oct', directRate: 75, subLeaseRate: 90 },  
      { month: 'Nov', directRate: 65, subLeaseRate: 85 },  
      { month: 'Dec', directRate: 70, subLeaseRate: 88 }  
    ],  
    hajjSeasonForecast: [  
      { name: 'Pre-Season', value: 65 },  
      { name: 'Early Season', value: 85 },  
      { name: 'Peak Season', value: 100 },  
      { name: 'Late Season', value: 90 },  
      { name: 'Post-Season', value: 70 }  
    ],  
    subLeaseExpiry: [  
      { name: 'Next 7 Days', count: 2 },  
      { name: '8-30 Days', count: 3 },  
      { name: '1-3 Months', count: 10 },  
      { name: '3-6 Months', count: 25 },  
      { name: '6+ Months', count: 58 }  
    ],  
    revenueComparison: [  
      { month: 'Jan', direct: 45000, subLease: 68000 },  
      { month: 'Feb', direct: 48000, subLease: 70000 },  
      { month: 'Mar', direct: 52000, subLease: 72000 },  
      { month: 'Apr', direct: 62000, subLease: 75000 },  
      { month: 'May', direct: 72000, subLease: 82000 },  
      { month: 'Jun', direct: 40000, subLease: 65000 }  
    ],  
    pilgrimSeasons: [  
      { name: 'Umrah (Off-Peak)', occupancy: 65, rate: 120 },  
      { name: 'Umrah (Regular)', occupancy: 85, rate: 180 },  
      { name: 'Ramadan', occupancy: 95, rate: 250 },  
      { name: 'Hajj', occupancy: 100, rate: 380 }  
    ],  
    upcomingAlerts: [  
      { id: 1, type: 'SubLease Expiry', property: 'Al Noor Tower, Floor 5', date: '2025-05-10', status: 'urgent' },  
      { id: 2, type: 'Lease Renewal', property: 'Zamzam View, Floor 3', date: '2025-05-15', status: 'warning' },  
      { id: 3, type: 'Bulk Check-in', property: 'Al Safa Heights', date: '2025-05-07', status: 'info' },  
      { id: 4, type: 'Maintenance Due', property: 'Al Noor Tower, Room 503', date: '2025-05-09', status: 'warning' }  
    ]  
  };

  // Calculate statistics  
  const directOccupancyRate = Math.round((mockData.directlyManaged - mockData.availableRooms) / mockData.directlyManaged * 100);  
  const subLeaseOccupancyRate = 94; // Assumed fixed percentage

  // Get current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
  return (  
    <div className={`min-h-screen ${themeStyles.background}`}>  
      {/* Header */}  
      <header className="bg-white dark:bg-gray-800 shadow-md">  
        <div className="mx-auto px-4 py-6 flex justify-between items-center">  
          <div>  
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Mecca Pilgrim Accommodation Manager</h1>  
            <p className="text-gray-500 dark:text-gray-400 text-sm">Dashboard for Al Barakat Hotel Group</p>  
          </div>  
          <div className="flex items-center gap-4">  
            <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full text-emerald-700 dark:text-emerald-300 text-sm font-medium flex items-center">  
              <CalendarDays className="w-4 h-4 mr-1" />  
              {formattedDate}
            </div>  
            <div className="flex items-center gap-2 text-sm">  
              <span className="font-medium text-gray-700 dark:text-gray-300">Hajj Season:</span>  
              <span className="text-amber-600 dark:text-amber-400 font-medium">128 Days Away</span>  
            </div>  
          </div>  
        </div>  
      </header>  
        
      {/* Main Content */}  
      <main className="max-w-7xl mx-auto py-6 px-4">  
        {/* KPI Cards */}  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">  
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">  
            <div className="flex justify-between items-start">  
              <div>  
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Leased Rooms</p>  
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{mockData.leasedRooms}</p>  
                <div className="flex items-center mt-1">  
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">  
                    {mockData.occupancyRate}% Occupied  
                  </span>  
                </div>  
              </div>  
              <span className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-md">  
                <Building className="w-5 h-5 text-blue-600 dark:text-blue-400" />  
              </span>  
            </div>  
          </div>  
            
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">  
            <div className="flex justify-between items-start">  
              <div>  
                <p className="text-gray-500 dark:text-gray-400 text-sm">Sub-Leased Rooms</p>  
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{mockData.subLeasedRooms}</p>  
                <div className="flex items-center mt-1">  
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">  
                    {subLeaseOccupancyRate}% Occupancy Rate  
                  </span>  
                </div>  
              </div>  
              <span className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-md">  
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />  
              </span>  
            </div>  
          </div>  
            
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">  
            <div className="flex justify-between items-start">  
              <div>  
                <p className="text-gray-500 dark:text-gray-400 text-sm">Directly Managed</p>  
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{mockData.directlyManaged}</p>  
                <div className="flex items-center mt-1">  
                  <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">  
                    {directOccupancyRate}% Occupancy Rate  
                  </span>  
                </div>  
              </div>  
              <span className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-md">  
                <Bed className="w-5 h-5 text-amber-600 dark:text-amber-400" />  
              </span>  
            </div>  
          </div>  
            
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">  
            <div className="flex justify-between items-start">  
              <div>  
                <p className="text-gray-500 dark:text-gray-400 text-sm">Available Direct Rooms</p>  
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{mockData.availableRooms}</p>  
                <div className="flex items-center mt-1">  
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">  
                    Ready to Book  
                  </span>  
                </div>  
              </div>  
              <span className="bg-green-100 dark:bg-green-900/30 p-2 rounded-md">  
                <Home className="w-5 h-5 text-green-600 dark:text-green-400" />  
              </span>  
            </div>  
          </div>  
        </div>  
          
        {/* Navigation Tabs */}  
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">  
          <div className="flex border-b border-gray-200 dark:border-gray-700">  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('overview')}  
            >  
              Overview  
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'leases' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('leases')}  
            >  
              Lease Management  
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'occupancy' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('occupancy')}  
            >  
              Occupancy Analysis  
            </button>  
            <button   
              className={`px-4 py-3 text-sm font-medium ${activeTab === 'alerts' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-500 dark:text-gray-400'}`}  
              onClick={() => setActiveTab('alerts')}  
            >  
              Alerts & Notifications  
            </button>  
          </div>  
        </div>  
          
        {/* Tab Content */}  
        {activeTab === 'overview' && <OverviewTab mockData={mockData} />}
        {activeTab === 'leases' && <LeaseManagementTab mockData={mockData} />}
        {activeTab === 'occupancy' && <OccupancyAnalysisTab mockData={mockData} />}
        {activeTab === 'alerts' && <AlertsAndNotificationsTab mockData={mockData} />}
      </main>  
    </div>  
  );  
};

export default Dashboard;