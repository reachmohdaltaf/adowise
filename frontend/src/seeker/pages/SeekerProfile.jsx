import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Upload } from 'lucide-react'
import React from 'react'
import { HiInformationCircle } from 'react-icons/hi2'
import { useSelector } from 'react-redux'

const SeekerProfile = () => {
  const {user} = useSelector((state) => state.auth)
  console.log("User Profile:",user)
  return (
   <Card className='px-2 mt-5 md:mt-6 border-none gap-0 '>
      <h1 className='text-2xl font-semibold mb-4 px-2'>Personal Information</h1>
      {/* tip container  */}
      <div className='flex bg-muted py-3 rounded-md px-4 gap-4 mb-6 '>
        <div>
          <HiInformationCircle/>
        </div>
        <div className=' text-xs'>
          <h2 className='font-semibold'>Tips</h2>
          <ul className='list-disc '>
            <li className='font-normal'> Adding your photo and social media profiles helps mentors feel confident that you’re a real person (e.g. not a bot). </li>
            <li className='font-normal'>  Your profile is only visible to mentors that you send applications to. It is not indexed on search engines like Google.  </li>
          </ul>
        </div>
      </div>
      {/* Profile image */}
      <div className='flex gap-4 justify-start items-center mb-6'>
        <img
          src={user?.image || 'https://placehold.co/600x400'}
          alt="Profile"
          className='w-24 h-24 rounded-full object-cover'
        />
        <Button variant={'outline'} size={'lg'}><Upload/> Upload Photo</Button>
      </div>
      {/* Personal Information Form */}
      <div>
        <Label className='flex flex-col mb-4 justify-start items-start'> 
          Full Name
          <Input
            type="text"
            placeholder='Enter your full name'
            className='py-5'
            defaultValue={user?.name || ''}
          />
        </Label>
      </div>
      {/* email address */}
      <div>
        <Label className='flex flex-col  justify-start items-start'> 
          Email Address
          <Input
            type="email"
            placeholder='Enter your email address'
            className='py-5'
            defaultValue={user?.email || ''}
          />
          
        </Label>
        <p className='text-xs mt-1 text-destructive'>Only Visible to you</p>
      </div>
      {/* proffession */}
      <div className='mt-6'>
        <Label className='flex flex-col mb-4 justify-start items-start'> 
          Proffession
          <Input
            type="text"
            placeholder='Enter your proffession'
            className='py-5'
            defaultValue={user?.proffession || ''}
          />
        </Label>
      </div>
      
      {/* About me */}
      <div className='mt-6'>
        <Label className='flex flex-col mb-4 justify-start items-start'> 
          About Me
          <Textarea
            type="text"
            placeholder='Tell us about yourself'
            className='py-5 h-58'
            defaultValue={user?.bio || ''}
          />
        </Label>  
        </div>
      {/* Social Media Links */}
      <div className='mt-6'>
        <Label className='flex flex-col mb-4 justify-start items-start'> 
          Social Media Links
          <Input
            type="text"
            placeholder='Enter your LinkedIn profile URL'
            className='py-5 mb-4'
            defaultValue={user?.socialLinks?.linkedin?.url || ''}
          />
          <Input
            type="text"
            placeholder='Enter your Twitter profile URL'
            className='py-5 mb-4'
            defaultValue={user?.socialLinks?.twitter?.url || ''}
          />
          <Input
            type="text"
            placeholder='Enter your GitHub profile URL'
            className='py-5'
            defaultValue={user?.socialLinks?.github?.url || ''}
          />
        </Label>
      </div>
      {/* Save Button */}
      <div className='flex justify-end mt-6'>
        <Button variant={'default'} size={'lg'}><Save/> Save Changes</Button>
      </div>
    </Card>
  )
}

export default SeekerProfile