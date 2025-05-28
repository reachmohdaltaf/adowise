import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='h-14 px-2 md:px-6 justify-between flex items-center w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20'>
      <Link to={'/'} className="logo">
        <img src="/logo5.png" className='h-8' alt="Logo" />
      </Link>
      <div className='buttons items-center flex gap-2'>
        {/* Login Redirect */}
        <Link to="/login">
          <Button variant="ghost">Login</Button>
        </Link>
      
        

        {/* Sign Up Redirect */}
        <Link to="/register">
          <Button variant={'colored'}>Sign Up</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
