import React from 'react'
import { Button } from '@/components/ui/button'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const ExpertBookingPage = () => {
  const { pathname } = useLocation()
  const isUpcoming = pathname.includes('upcoming')

  return (
    <div className='py-6'>
      <h1 className='text-2xl font-semibold mb-4 px-2'>Booking</h1>

      <div className='flex items-center sticky top-0 py-3 bg-background justify-between  mb-6'>
        <div className='gap-3 flex'>
          <Link to="upcoming">
            <Button className={'md:px-6 px-4'} variant={isUpcoming ? 'default' : 'outline'}>Upcoming (10)</Button>
          </Link>
          <Link to="completed">
            <Button className={'md:px-6 px-4'} variant={!isUpcoming ? 'default' : 'outline'}>Completed (0)</Button>
          </Link>
        </div>

        <Dialog>
  <DialogTrigger asChild>
    <Button size="icon">+</Button>
  </DialogTrigger>
  <DialogContent className="h-auto max-w-2xl">
    <DialogHeader>
      <DialogTitle>What are you creating today?</DialogTitle>
      <DialogDescription>Select a type to continue</DialogDescription>
    </DialogHeader>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {[
        {
          title: '1:1 Call',
          description: 'Conduct 1:1 video sessions',
        },
        {
          title: 'Priority DM',
          description: 'Setup your priority inbox',
        },
        {
          title: 'Webinar',
          description: 'Host one time or recurring group sessions',
        },
        {
          title: 'Digital Product',
          description: 'Sell digital products, courses, paid videos & more',
        },
        {
          title: 'Package',
          description: 'Bundle your offerings into one',
        },
      ].map((item, index) => (
        <button
          key={index}
          className="rounded-xl cursor-pointer border p-4 text-left hover:border-primary hover:bg-muted transition"
        >
          <h3 className="font-medium text-lg">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </button>
      ))}
    </div>
  </DialogContent>
</Dialog>

      </div>

      <div className='mb-20'>
        <Outlet />
      </div>
    </div>
  )
}

export default ExpertBookingPage
