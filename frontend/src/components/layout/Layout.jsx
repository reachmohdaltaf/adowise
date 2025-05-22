import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Layout = () => {
  return (
    <div className='bg-background scroll h-screen max-w-screen-2xl mx-auto home'>
      <div className='fixed top-0 max-w-screen-2xl mx-auto z-10 w-full'>
      <Navbar/>
      </div>
       <Outlet/>
    </div>
  )
}

export default Layout