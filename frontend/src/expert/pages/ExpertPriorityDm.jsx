import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Outlet, useLocation } from 'react-router-dom'

const ExpertPriorityDm = () => {
  const { pathname } = useLocation()
  const isSent = pathname.includes('pending')

  return (
    <div className='py-6 px-2'>
      <h1 className='text-2xl font-semibold mb-4 px-2'>Priority DM</h1>

      <div className='flex gap-4 mb-6'>
        <Link to="pending">
          <Button variant={isSent ? 'default' : 'outline'}>Pending</Button>
        </Link>
        <Link to="answered-by-expert">
          <Button variant={!isSent ? 'default' : 'outline'}>Answered</Button>
        </Link>
      </div>

      <div className=''>
        <Outlet />
      </div>
    </div>
  )
}

export default ExpertPriorityDm;
