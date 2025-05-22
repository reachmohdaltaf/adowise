import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
const FindExpertCard = () => {
  return (
    <Link to={'/seeker/dashboard/mentors'}><Card className="w-full h-fit gap-2 p-2 bg-primary text-primary-foreground overflow-x-auto">
    <CardHeader className="px-2 mt-2">
     <Link to={'/seeker/dashboard/mentors'}><Button className="w-32 sm:w-40 text-xs sm:text-base text-foreground" variant="outline">
        <ArrowUpRight /> Find Expert
      </Button></Link> 
    </CardHeader>
  
    <CardContent className="px-2 flex items-center justify-between gap-4">
      
      <h2 className="text-xl sm:text-4xl font-bold max-w-[12rem] sm:max-w-xs">
        Boost your career, talk to real pros instantly
      </h2>
      <img loading='lazy' src="/lens.png" className="h-24 sm:h-40" alt="lens" />
    </CardContent>
  
    <CardFooter className="px-2 text-xs sm:text-sm">
      Earn 10% commission on every booking
    </CardFooter>
   
  </Card></Link> 
  )
}

export default FindExpertCard