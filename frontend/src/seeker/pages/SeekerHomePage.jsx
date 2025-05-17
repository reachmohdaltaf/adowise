
import React from 'react'
import TopExperts from '../components/TopExperts'
import GetReferredCard from '../components/GetReferredCard'
import FindExpertCard from '../components/FindExpertCard'
import { Card, CardHeader } from '@/components/ui/card'
import AlreadyAnsweredCard from '../components/AlreadyAnsweredCard'
import { testimonials } from '@/json/testimonials'
import TestimonialCard from '../components/TestimonialCard'

const SeekerHomePage = () => {
  return (
    <div className='md:py-6 gap-2   w-full flex flex-col'>
      

 

<Card className="w-full border-none  gap-2 p-2  px-0">
  {/* //top experts */}
  <FindExpertCard />
  <CardHeader className="px-2">
    <div className="flex pt-4 items-center gap-2">
       Top Experts
    </div>
    {/* <TopExperts /> */}
   <div className='flex lg:flex-row mb-10 flex-col gap-2'>
   <GetReferredCard/>
   <AlreadyAnsweredCard/>
  
   </div>
  <div className='flex md:flex-row flex-col mb-10 gap-2'>
  {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
  </div>
  </CardHeader>
 
</Card>

    </div>
  )
}

export default SeekerHomePage