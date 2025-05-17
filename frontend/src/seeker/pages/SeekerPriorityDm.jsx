import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Outlet, useLocation } from 'react-router-dom'

const SeekerPriorityDm = () => {
  const { pathname } = useLocation()
  const isSent = pathname.includes('sent-messages')

  return (
    <div className='py-6'>
      <h1 className='text-2xl font-semibold mb-4 px-2'>Priority DM</h1>

      <div className='flex gap-4 mb-6'>
        <Link to="sent-messages">
          <Button variant={isSent ? 'default' : 'outline'}>Sent Messages</Button>
        </Link>
        <Link to="answered-by-experts">
          <Button variant={!isSent ? 'default' : 'outline'}>Answered</Button>
        </Link>
      </div>

      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}

export default SeekerPriorityDm
