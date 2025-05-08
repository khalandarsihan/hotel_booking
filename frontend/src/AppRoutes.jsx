// frontend/src/AppRoutes.jsx
// Updated routes file with modal booking form instead of page-based form

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
import Dashboard from './pages/Dashboard';
import BookingsPage from './pages/BookingsPage';
import RoomManagement from './pages/RoomManagement';
import BookingCalendar from './pages/BookingCalendar';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetails from './pages/PropertyDetails';
import BookingDetail from './pages/BookingDetails';
import AccountsPage from './pages/AccountsPage';
import PageNotFound from './pages/PageNotFound';

const AppRoutes = () => {
  // Get the current path from window.location
  const currentPath = window.location.pathname;
  
  // Check for trailing slash and remove it for consistency
  const normalizedPath = currentPath.endsWith('/') && currentPath !== '/' 
    ? currentPath.slice(0, -1) 
    : currentPath;

  return (
    <BrowserRouter basename="">
      <AppWrapper>
        <Routes>
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Property Routes */}
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/property-details" element={<PropertyDetails />} />
          <Route path="/add-property" element={<PropertyDetails isNew={true} />} />
          
          {/* Room Routes */}
          <Route path="/rooms" element={<RoomManagement />} />
          
          {/* Booking Routes */}
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/booking-calendar" element={<BookingCalendar />} />
          <Route path="/booking-details" element={<BookingDetail />} />
          
          {/* Note: We've removed the /new-booking and /edit-booking routes 
              since we're now using modals instead of separate pages */}

          {/* Accounts Routes */}
          <Route path="/accounts" element={<AccountsPage />} />
          
          {/* Redirect and 404 */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default AppRoutes;