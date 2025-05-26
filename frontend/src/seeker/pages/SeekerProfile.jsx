import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getUserProfile, updateProfile } from '@/redux/features/userThunk'
import { Save, Upload } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { HiInformationCircle } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'

const SeekerProfile = () => {
  const dispatch = useDispatch()
  const {user}   = useSelector((state) => state.user)
  console.log("User data:", user)
  const [imagePreview, setImagePreview] = useState(user?.image )
  const [selectedImage, setSelectedImage] = useState(null)
  const [formLoading, setFormLoading] = useState(false)
  const fileInputRef = useRef(null)
  const SuccessPopRef = useRef(null)
  useEffect(() => {
    // Fetch user profile on component mount
    dispatch(getUserProfile())
  }, [dispatch])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormLoading(true)
    const formData = new FormData(e.target)

    if (!selectedImage) {
      // No new image selected — just dispatch with form data
      dispatch(updateProfile({
        name: formData.get('name'),
        email: formData.get('email'),
        profession: formData.get('profession'),
        about: formData.get('about'),
        socialLinks: {
          linkedin: { url: formData.get('linkedin') },
          twitter: { url: formData.get('twitter') },
          github: { url: formData.get('github') }
        },
        // no image here
      })).then((response) => {
        setFormLoading(false) // Reset loading state
        if (response.meta.requestStatus === 'fulfilled') {
          console.log("Profile updated successfully:", response.payload)
          SuccessPopRef.current.click() // Trigger the success dialog
          
        } else {
          console.error("Failed to update profile:", response.error)
        }
      }).catch((error) => {
        setFormLoading(false) // Reset loading state on error
        console.error("Error updating profile:", error)
      })
      return
    }

    // If image is selected, convert it to base64 before dispatching
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64Image = reader.result

      dispatch(updateProfile({
        name: formData.get('name'),
        email: formData.get('email'),
        profession: formData.get('profession'),
        about: formData.get('about'),
        socialLinks: {
          linkedin: { url: formData.get('linkedin') },
          twitter: { url: formData.get('twitter') },
          github: { url: formData.get('github') }
        },
        image: base64Image,
      })).then((response) => {
        setFormLoading(false) // Reset loading state
        if (response.meta.requestStatus === 'fulfilled') {
          console.log("Profile updated successfully:", response.payload)
          SuccessPopRef.current.click() // Trigger the success dialog
          dispatch(getUserProfile())
          setSelectedImage(null) // Reset selected image after successful save
        } else {
          console.error("Failed to update profile:", response.error)
        }
      }).catch((error) => {
        setFormLoading(false) // Reset loading state on error
        console.error("Error updating profile:", error)
      })
    }
    reader.readAsDataURL(selectedImage)
  }

  return (
    <Card className='px-2 mt-5 md:mt-6 border-none gap-0 '>
      <h1 className='text-2xl font-semibold mb-4 px-2'>Personal Information</h1>

      {/* Tip Box */}
      <div className='flex bg-muted py-3 rounded-md px-4 gap-4 mb-6 '>
        <div>
          <HiInformationCircle />
        </div>
        <div className='text-xs'>
          <h2 className='font-semibold'>Tips</h2>
          <ul className='list-disc'>
            <li className='font-normal'>Adding your photo and social media profiles helps mentors feel confident that you're a real person (e.g. not a bot).</li>
            <li className='font-normal'>Your profile is only visible to mentors that you send applications to. It is not indexed on search engines like Google.</li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        {/* Profile Image */}
        <div className='flex gap-4 justify-start items-center mb-6'>
          <img
            src={imagePreview}
            alt="Profile"
            className='w-24 h-24 rounded-full object-cover'
          />
          {
            selectedImage ? (
              <Button
                type='submit'
                disabled={formLoading}
                className=''
              >
                {formLoading ? (
                  <>
                    <span className='animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2'></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className='mr-2' /> Save
                  </>
                )}
              </Button>
            ) : (
              <Button
                type='button'
                variant={'outline'}
                onClick={handleUploadClick}
                disabled={formLoading}
                className=''
              >
                <Upload className='mr-2' /> Change Image
              </Button>
            )
          }
        </div>

        {/* Other Inputs */}
        <div>
          <Label className='flex flex-col mb-4 justify-start items-start'>
            Full Name
            <Input
              name="name"
              type="text"
              placeholder='Enter your full name'
              className='py-5'
              defaultValue={user?.name || ''}
              disabled={formLoading}
            />
          </Label>
        </div>

        <div>
          <Label className='flex flex-col justify-start items-start'>
            Email Address
            <Input
              name="email"
              type="email"
              placeholder='Enter your email address'
              className='py-5'
              defaultValue={user?.email || ''}
              disabled={formLoading}
            />
          </Label>
          <p className='text-xs mt-1 text-destructive'>Only Visible to you</p>
        </div>

        <div className='mt-6'>
          <Label className='flex flex-col mb-4 justify-start items-start'>
            Profession
            <Input
              name="profession"
              type="text"
              placeholder='Enter your profession'
              className='py-5'
              defaultValue={user?.profession || ''}
              disabled={formLoading}
            />
          </Label>
        </div>

        <div className='mt-6'>
          <Label className='flex flex-col mb-4 justify-start items-start'>
            About Me
            <Textarea
              name="about"
              placeholder='Tell us about yourself'
              className='py-5 h-58'
              defaultValue={user?.about || ''}
              disabled={formLoading}
            />
          </Label>
        </div>

        <div className='mt-6'>
          <Label className='flex flex-col mb-4 justify-start items-start'>
            Social Media Links
            <Input
              name="linkedin"
              type="text"
              placeholder='Enter your LinkedIn profile URL'
              className='py-5 mb-4'
              defaultValue={user?.socialLinks?.linkedin?.url || ''}
              disabled={formLoading}
            />
            <Input
              name="twitter"
              type="text"
              placeholder='Enter your Twitter profile URL'
              className='py-5 mb-4'
              defaultValue={user?.socialLinks?.twitter?.url || ''}
              disabled={formLoading}
            />
            <Input
              name="github"
              type="text"
              placeholder='Enter your GitHub profile URL'
              className='py-5'
              defaultValue={user?.socialLinks?.github?.url || ''}
              disabled={formLoading}
            />
          </Label>
        </div>

        <div className='flex justify-end mt-6'>
          {/* Save Changes Button */}
          <Button 
            type='submit' 
            disabled={formLoading}
            className='bg-primary text-primary-foreground'
          >
            {formLoading ? (
              <>
                <span className='animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2'></span>
                Saving...
              </>
            ) : (
              <>
                <Save className='mr-2' /> Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <button
            ref={SuccessPopRef}
            className='hidden'
          >
            updatedSuccess
          </button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center gap-4 text-center py-8">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-green-700">Profile Updated!</h2>
          <p className="text-gray-500 max-w-sm">
            Your profile has been successfully updated. You can now continue exploring the platform.
          </p>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default SeekerProfile