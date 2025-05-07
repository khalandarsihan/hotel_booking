import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { useLightTheme, toggleTheme, themeStyles } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
                <span className="text-blue-600 dark:text-blue-400 font-semibold text-xl">HotelBooking</span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a 
                href="/" 
                className="border-blue-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </a>
              <a 
                href="/bookings" 
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Bookings
              </a>
              <a 
                href="/rooms" 
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Rooms
              </a>
              <a 
                href="/properties" 
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Properties
              </a>
            </div>
          </div>
          
          {/* User account and theme toggle */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {useLightTheme ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* User menu */}
            <div className="relative">
              <button 
                className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 items-center text-gray-700 dark:text-gray-200"
              >
                <User size={20} className="mr-1" />
                <span>Admin</span>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="bg-blue-50 dark:bg-gray-700 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="/bookings"
              className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Bookings
            </a>
            <a
              href="/rooms"
              className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Rooms
            </a>
            <a
              href="/properties"
              className="border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Properties
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">Admin User</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">admin@example.com</div>
              </div>
              <button 
                onClick={toggleTheme}
                className="ml-auto p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {useLightTheme ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <a
                href="/profile"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Your Profile
              </a>
              <a
                href="/settings"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <a
                href="/logout"
                className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;