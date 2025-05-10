import React from 'react';
import { useTheme } from './ThemeContext';

const Footer = () => {
  const { themeStyles } = useTheme();
  
  return (
    <footer className={`${themeStyles.footer} shadow-inner`}>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <span className="text-amber-600 dark:text-amber-400 font-semibold text-lg mr-2">
              HotelBooking
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-500 dark:text-amber-400/80 hover:text-amber-600 dark:hover:text-amber-300 text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 dark:text-amber-400/80 hover:text-amber-600 dark:hover:text-amber-300 text-sm">
              Terms of Service
            </a>
            <a href="/contact" className="text-gray-500 dark:text-amber-400/80 hover:text-amber-600 dark:hover:text-amber-300 text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;