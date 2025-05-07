import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg mr-2">
              HotelBooking
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
              Terms of Service
            </a>
            <a href="/contact" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;