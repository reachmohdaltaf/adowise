import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HomeIcon, Phone } from 'lucide-react'
import React from 'react'

const SeekerMobileFooter = () => {
  return (  
    <Card className='bg-background py-3 '>
      <CardContent className={'px-5  gap-4 flex justify-around'}>
        <Button size={'lg'} variant={'outline'} className={'bg-accent w-14 h-10'}><HomeIcon/></Button>
        <Button size={'lg'} variant={'outline'} className={'bg-accent w-14 h-10'}><Phone/></Button>
        <Button size={'lg'} variant={'outline'} className={'bg-accent w-14 h-10'}><HomeIcon/></Button>
        <Button size={'lg'} variant={'outline'} className={'bg-accent w-14 h-10'} ><HomeIcon/></Button>
      </CardContent>
    </Card>
  )
}

export default SeekerMobileFooter