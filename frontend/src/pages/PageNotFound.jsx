import React from 'react';
import { useTheme } from '../components/ui/ThemeContext';
import { Home, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  const { themeStyles } = useTheme();

  return (
    <div className={`min-h-screen ${themeStyles.background} flex items-center justify-center p-4`}>
      <div className="max-w-md w-full text-center">
        <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3 h-24 w-24 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
          <Search size={48} />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">Page Not Found</h2>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for doesn't exist or has been moved. 
          Check the URL or go back to the homepage.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link 
            to="/"
            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Home size={20} className="mr-2" />
            Go to Home
          </Link>
          
          <Link 
            to="/bookings"
            className="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            View Bookings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;