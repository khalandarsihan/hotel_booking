// import React, { useEffect } from 'react';
// import { ThemeProvider } from './ui/ThemeContext';
// import Navbar from './ui/Navbar';
// import Footer from './ui/Footer';

// // Main wrapper component that provides theme context and layout structure
// const AppWrapper = ({ children }) => {
//   // Add meta viewport tag programmatically for mobile responsiveness
//   useEffect(() => {
//     // Check if viewport meta exists
//     let viewportMeta = document.querySelector('meta[name="viewport"]');
    
//     // If it doesn't exist, create it
//     if (!viewportMeta) {
//       viewportMeta = document.createElement('meta');
//       viewportMeta.name = 'viewport';
//       document.head.appendChild(viewportMeta);
//     }
    
//     // Set the content regardless
//     viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
//   }, []);
  
//   return (
//     <ThemeProvider>
//       <div className="flex flex-col min-h-screen">
//         <Navbar />
//         <main className="flex-grow">{children}</main>
//         <Footer />
//       </div>
//     </ThemeProvider>
//   );
// };

// export default AppWrapper;

// frontend/src/components/AppWrapper.jsx
// Fix for AppWrapper to ensure proper layout rendering

import React, { useEffect } from 'react';
import { ThemeProvider } from './ui/ThemeContext';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

// Main wrapper component that provides theme context and layout structure
const AppWrapper = ({ children }) => {
  // Add meta viewport tag programmatically for mobile responsiveness
  useEffect(() => {
    // Check if viewport meta exists
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    
    // If it doesn't exist, create it
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.name = 'viewport';
      document.head.appendChild(viewportMeta);
    }
    
    // Set the content regardless
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    
    // Remove loading placeholder
    const loadingPlaceholder = document.getElementById('loading-placeholder');
    if (loadingPlaceholder && loadingPlaceholder.parentNode) {
      loadingPlaceholder.parentNode.removeChild(loadingPlaceholder);
    }
  }, []);
  
  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AppWrapper;