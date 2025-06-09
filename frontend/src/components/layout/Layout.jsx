import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  const location = useLocation();
  const { user, isCheckAuth } = useSelector((state) => state.auth);
  
  // Define routes where footer should not appear (authenticated routes)
  const noFooterRoutes = [
    '/dashboard',
    '/profile',
    '/expert-dashboard',
    '/seeker-dashboard',
    // Add other authenticated routes
  ];
  
  // Check if current route should show footer
  const shouldShowFooter = !user || !noFooterRoutes.some(route => 
    location.pathname.startsWith(route)
  );

  return (
    <div className='min-h-screen max-w-screen-3xl mx-auto relative'>
      {/* Fixed Navbar */}
      <div className='fixed top-0 left-0 right-0 z-50 max-w-screen-3xl mx-auto'>
        <Navbar/>
      </div>
      
      {/* Main Content Area */}
      <div className=' min-h-screen'> {/* Added min-h-screen */}
        <Outlet/>
      </div>
      
      {/* Footer with smooth transition */}
      <div 
        className={`transition-all duration-300 ease-in-out ${
          shouldShowFooter 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-full pointer-events-none absolute'
        }`}
      >
        <Footer />
      </div>
    </div>
  );
}

export default Layout