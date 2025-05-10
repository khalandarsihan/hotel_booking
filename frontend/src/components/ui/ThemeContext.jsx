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

  // Theme-based styles with hospitality-friendly colors
  const themeStyles = useLightTheme ? {
    // Light theme - warm, inviting colors
    background: "bg-amber-50",
    text: {
      primary: "text-gray-800",
      secondary: "text-gray-700", 
      light: "text-gray-600"
    },
    heading: "text-amber-800",
    subheading: "text-amber-700",
    card: {
      bg: "bg-white",
      border: "border-amber-200",
      hoverBorder: "hover:border-amber-400"
    },
    cta: {
      bg: "bg-amber-600",
      hover: "hover:bg-amber-500"
    },
    accent: {
      light: "bg-amber-50",
      medium: "bg-amber-100",
      strong: "bg-amber-200"
    },
    navbar: "bg-white",
    footer: "bg-white"
  } : {
    // Dark theme - luxurious, upscale hotel atmosphere (significantly changed)
    background: "bg-slate-900",
    text: {
      primary: "text-gray-100",
      secondary: "text-gray-200", 
      light: "text-gray-300"
    },
    heading: "text-amber-300",
    subheading: "text-amber-200",
    card: {
      bg: "bg-slate-800",
      border: "border-amber-900",
      hoverBorder: "hover:border-amber-400"
    },
    cta: {
      bg: "bg-amber-600",
      hover: "hover:bg-amber-500"
    },
    accent: {
      light: "bg-amber-900/40",
      medium: "bg-amber-800/60",
      strong: "bg-amber-700/80"
    },
    navbar: "bg-slate-800",
    footer: "bg-slate-800"
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