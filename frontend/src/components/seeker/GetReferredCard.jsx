import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const GetReferredCard = () => {
  return (
    <Card className="w-full max-w-full   gap-2 mb-0 rounded-2xl shadow-md">
      <CardHeader className={'px-2'}>
        <CardTitle className="text-xl font-semibold">Apply to Jobs with Referral</CardTitle>
      </CardHeader>
      <CardContent className={'px-2 '}>
        <p className="text-gray-600 ">
          Boost your chances by applying to jobs through employee referrals. Stand out to recruiters!
        </p>
        <Button className="w-full mt-10">Get Referred</Button>

      </CardContent>
    
    </Card>
  )
}

export default GetReferredCard
