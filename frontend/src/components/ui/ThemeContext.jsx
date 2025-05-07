import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to light theme
  const [useLightTheme, setUseLightTheme] = useState(() => {
    // Try to get saved preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check if user prefers dark mode
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      return savedTheme === 'light';
    } else {
      return !prefersDarkMode;
    }
  });

  // Theme-based styles
  const themeStyles = useLightTheme ? {
    background: "bg-gray-50",
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-700", 
      light: "text-gray-600"
    },
    heading: "text-blue-800",
    subheading: "text-blue-700",
    card: {
      bg: "bg-white",
      border: "border-gray-200",
      hoverBorder: "hover:border-blue-400"
    },
    cta: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-500"
    },
    accent: {
      light: "bg-blue-50",
      medium: "bg-blue-100",
      strong: "bg-blue-200"
    }
  } : {
    background: "bg-gray-900",
    text: {
      primary: "text-gray-200",
      secondary: "text-gray-300", 
      light: "text-gray-400"
    },
    heading: "text-blue-300",
    subheading: "text-blue-200",
    card: {
      bg: "bg-gray-800",
      border: "border-gray-700",
      hoverBorder: "hover:border-blue-300"
    },
    cta: {
      bg: "bg-blue-600",
      hover: "hover:bg-blue-500"
    },
    accent: {
      light: "bg-blue-900/30",
      medium: "bg-blue-800/40",
      strong: "bg-blue-700/50"
    }
  };

  // Toggle theme function
  const toggleTheme = () => {
    setUseLightTheme(!useLightTheme);
  };

  // Save theme preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', useLightTheme ? 'light' : 'dark');
    
    // Update document class for global theme
    if (useLightTheme) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [useLightTheme]);

  // Apply theme class on mount
  useEffect(() => {
    if (!useLightTheme) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Provider value
  const value = {
    useLightTheme,
    toggleTheme,
    themeStyles
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};