import React from 'react';
import DashboardUI from '../components/Dashboard';
import { useTheme } from '../components/ui/ThemeContext';

const Dashboard = () => {
  const { themeStyles } = useTheme();
  
  return (
    <div className={`min-h-screen ${themeStyles.background}`}>
      <DashboardUI />
    </div>
  );
};

export default Dashboard;