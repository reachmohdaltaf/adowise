import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import React from 'react'

const AlreadyAnsweredCard = () => {
  return (
    <Card className={'bg-primary gap-0  flex flex-col justify-between px-2 text-primary-foreground w-full '}>
<h1 className=' text-2xl md:text-4xl font-bold'>Your Career Questions, Already Answered</h1>
<CardFooter className={'px-2'}>
<Button variant={'outline'} className={'bg-background mt-10 text-foreground'}>View</Button>
</CardFooter>
    </Card>

  )
}

export default AlreadyAnsweredCard