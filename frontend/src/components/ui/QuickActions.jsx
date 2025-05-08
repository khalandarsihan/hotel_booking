import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle,
  Calendar as CalendarIcon,
  Calendar,
} from 'lucide-react';
import { useTheme } from './ThemeContext';

// Modal Components
import CheckInModal from './modals/CheckInModal';
import CheckOutModal from './modals/CheckOutModal';
import NewSubLeaseModal from './modals/NewSubLeaseModal';
import RenewLeaseModal from './modals/RenewLeaseModal';
import SubLeaseRenewalModal from './modals/SubLeaseRenewalModal';
import BookingModal from './modals/BookingModal';

const QuickActions = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { themeStyles } = useTheme();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
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

  const handleBookingSubmit = (bookingData) => {
    console.log('New booking created:', bookingData);
    // API call can be made here
  };

  return (
    <div className="relative">
      {/* Quick Actions Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
        aria-expanded={isDropdownOpen}
      >
        <CalendarIcon className="h-4 w-4 mr-2" />
        <span>Quick Actions</span>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="quick-actions-dropdown absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 py-1 ring-1 ring-black ring-opacity-5">
          <button
            onClick={() => openModal('new-booking')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <CalendarIcon className="h-4 w-4 mr-2 text-teal-600 dark:text-teal-400" />
            New Booking
          </button>
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
          <button
            onClick={() => openModal('renew-sublease')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
          >
            <Calendar className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
            Renew Sub-Lease
          </button>
        </div>
      )}

      {/* Modals */}
      <BookingModal
        isOpen={activeModal === 'new-booking'}
        onClose={closeModal}
        onSubmit={handleBookingSubmit}
      />
      {activeModal === 'check-in' && <CheckInModal onClose={closeModal} />}
      {activeModal === 'check-out' && <CheckOutModal onClose={closeModal} />}
      {activeModal === 'new-sublease' && <NewSubLeaseModal onClose={closeModal} />}
      {activeModal === 'renew-lease' && <RenewLeaseModal onClose={closeModal} />}
      {activeModal === 'renew-sublease' && <SubLeaseRenewalModal onClose={closeModal} />}
    </div>
  );
};

export default QuickActions;
