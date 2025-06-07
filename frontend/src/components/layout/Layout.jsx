import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='min-h-screen max-w-screen-3xl mx-auto'>
      {/* Fixed Navbar */}
      <div className='fixed top-0 left-0 right-0 z-50 max-w-screen-3xl mx-auto'>
        <Navbar/>
      </div>
      
      {/* Main Content Area */}
      <div className='pt-4'> {/* pt-14 to offset fixed navbar height */}
        <Outlet/>
      </div>
      
      {/* Footer at bottom */}
      <Footer />
    </div>
  );
}

export default Layout