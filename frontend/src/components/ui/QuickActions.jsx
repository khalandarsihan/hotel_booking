// frontend/src/components/ui/QuickActions.jsx
import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle, 
  Calendar, 
  Calendar as CalendarIcon,
  X,
  Clock,
  Home,
  Building,
  User,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';
import { useTheme } from './ThemeContext';

// Modal Components
import CheckInModal from './modals/CheckInModal';
import CheckOutModal from './modals/CheckOutModal';
import NewSubLeaseModal from './modals/NewSubLeaseModal';
import RenewLeaseModal from './modals/RenewLeaseModal';

const QuickActions = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { themeStyles } = useTheme();

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  // Open specific modal
  const openModal = (modalName) => {
    setActiveModal(modalName);
    setIsDropdownOpen(false); // Close dropdown when opening modal
  };

  // Close modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.quick-actions-dropdown') === null) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* Quick Actions Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
        aria-expanded={isDropdownOpen}
      >
        <Calendar className="h-4 w-4 mr-2" />
        <span>Quick Actions</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="quick-actions-dropdown absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 py-1 ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => openModal('check-in')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <Users className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
            New Check-in
          </button>
          <button
            onClick={() => openModal('check-out')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
            Process Check-out
          </button>
          <button
            onClick={() => openModal('new-sublease')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <CalendarIcon className="h-4 w-4 mr-2 text-amber-600 dark:text-amber-400" />
            New Sub-Lease
          </button>
          <button
            onClick={() => openModal('renew-lease')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
            Renew Lease
          </button>
        </div>
      )}

      {/* Modals */}
      {activeModal === 'check-in' && (
        <CheckInModal onClose={closeModal} />
      )}
      
      {activeModal === 'check-out' && (
        <CheckOutModal onClose={closeModal} />
      )}
      
      {activeModal === 'new-sublease' && (
        <NewSubLeaseModal onClose={closeModal} />
      )}
      
      {activeModal === 'renew-lease' && (
        <RenewLeaseModal onClose={closeModal} />
      )}
    </div>
  );
};

export default QuickActions;