import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../components/ui/ThemeContext';
import { Calendar, ChevronLeft, ChevronRight, Check, Filter } from 'lucide-react';

const BookingCalendar = () => {
  const { themeStyles } = useTheme();
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Get month details
  const getMonthDetails = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Get previous month's last days to fill the start of the calendar
    const prevMonthDays = new Date(year, month, 0).getDate();
    const prevMonthFillDays = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    
    // Calculate total days needed (current month + filler days)
    const calendarDays = [];
    
    // Add previous month days
    for (let i = prevMonthDays - prevMonthFillDays + 1; i <= prevMonthDays; i++) {
      calendarDays.push({
        day: i,
        month: 'prev',
        date: new Date(year, month - 1, i),
        bookings: []
      });
    }
    
    // Add current month days
    for (let i = 1; i <= totalDays; i++) {
      // Mock booking data - in real app would come from API
      const bookings = [];
      if (i % 3 === 0) bookings.push({ type: 'check-in', count: Math.floor(Math.random() * 3) + 1 });
      if (i % 4 === 0) bookings.push({ type: 'check-out', count: Math.floor(Math.random() * 3) + 1 });
      if (i % 5 === 0) bookings.push({ type: 'stay', count: Math.floor(Math.random() * 5) + 3 });
      
      calendarDays.push({
        day: i,
        month: 'current',
        date: new Date(year, month, i),
        bookings
      });
    }
    
    // Fill remaining days from next month if needed
    const remainingDays = 42 - calendarDays.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      calendarDays.push({
        day: i,
        month: 'next',
        date: new Date(year, month + 1, i),
        bookings: []
      });
    }
    
    return calendarDays;
  };

  const calendarDays = getMonthDetails();
  
  // Format current month name
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Handle navigation
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

    // Navigation handler for New Booking button
    const handleNewBookingClick = () => {
      navigate('/new-booking');
    };

  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Calendar</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Manage your property bookings</p>
          </div>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center">
              <Filter size={16} className="mr-1" />
              <span>Filters</span>
            </button>
            <button 
              onClick={handleNewBookingClick}
              className="px-3 py-2 bg-blue-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 flex items-center"
            >
              <Calendar size={16} className="mr-1" />
              <span>New Booking</span>
            </button>
          </div>
        </header>
        
        {/* Filter tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 p-1">
          <div className="flex">
            {['all', 'check-ins', 'check-outs', 'stays'].map((filter) => (
              <button
                key={filter}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                  activeFilter === filter 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Calendar component */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          {/* Calendar header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{monthName}</h2>
            <div className="flex space-x-2">
              <button 
                onClick={goToPrevMonth}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          {/* Days of week */}
          <div className="grid grid-cols-7 text-center border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 text-sm">
            {calendarDays.map((day, index) => {
              const isOtherMonth = day.month !== 'current';
              const isToday = new Date().toDateString() === day.date.toDateString();
              const isSelected = selectedDate && selectedDate.toDateString() === day.date.toDateString();
              
              return (
                <div 
                  key={index}
                  className={`min-h-[100px] p-2 border-b border-r border-gray-200 dark:border-gray-700 ${
                    isOtherMonth ? 'bg-gray-50 dark:bg-gray-700/50' : ''
                  } ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''} ${
                    isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
                  }`}
                  onClick={() => setSelectedDate(day.date)}
                >
                  <div className={`text-right ${
                    isOtherMonth 
                      ? 'text-gray-400 dark:text-gray-500' 
                      : isToday 
                        ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                        : 'text-gray-900 dark:text-white'
                  }`}>
                    {day.day}
                  </div>
                  
                  {/* Booking indicators */}
                  <div className="mt-2 space-y-1">
                    {day.bookings.map((booking, idx) => (
                      <div 
                        key={idx}
                        className={`text-xs px-1 py-0.5 rounded ${
                          booking.type === 'check-in' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                            : booking.type === 'check-out' 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                        }`}
                      >
                        {booking.type === 'check-in' ? 'Check-in' : booking.type === 'check-out' ? 'Check-out' : 'Stay'}
                        {booking.count > 1 ? ` (${booking.count})` : ''}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Booking details panel would go here in a real app */}
        {selectedDate && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Bookings for {selectedDate.toLocaleDateString()}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Select a booking to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCalendar;