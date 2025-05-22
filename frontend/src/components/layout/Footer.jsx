import React from 'react'
import { Button } from '../ui/button'

const Footer = () => {
  return (
    <div className='h-80 mt-10 px-10 py-10 bg-gradient-to-tl rounded-t-4xl from-muted-foreground to-[#9a8be7] '>
    <div className=''>
        <div className="logo flex items-center gap-6">
            <img src="/logo3.svg" className='h-18' alt="" />
            <p className='text-6xl text-background'>adowise</p>
        </div>
        <div>
            <Button className={'w-[600px] rounded-lg justify-start mt-4 py-6'} variant={'colored'}>
                Suggestion’s
            </Button>
        </div>
    </div>
    <div></div>
    </div>
  )
}

export default Footer