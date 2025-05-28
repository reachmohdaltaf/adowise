import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Outlet, useLocation } from 'react-router-dom'

const SeekerBookingPage = () => {
  const { pathname } = useLocation()
  const isUpcoming = pathname.includes('upcoming')

  return (
    <div className='py-6'>
      <h1 className='text-2xl font-semibold mb-4 px-2'>Booking</h1>

      <div className='flex gap-4 mb-6'>
        <Link to="upcoming">
          <Button size={'sm'} variant={isUpcoming ? 'default' : 'outline'}>Upcoming</Button>
        </Link>
        <Link to="completed">
          <Button size={'sm'} variant={!isUpcoming ? 'default' : 'outline'}>Completed</Button>
        </Link>
      </div>
    
      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}

export default SeekerBookingPage
