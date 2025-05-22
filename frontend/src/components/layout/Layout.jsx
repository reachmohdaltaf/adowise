import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className='bg-background scroll h-screen max-w-screen-2xl mx-auto home'>
      <div className='fixed top-0 max-w-screen-2xl mx-auto z-50 w-full'>
      <Navbar/>
      </div>
       <Outlet/>
     
    </div>
  )
}

export default Layout