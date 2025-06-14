import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getUserProfile, updateProfile } from "@/redux/features/userThunk";
import { Save, Upload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import SeekerProfileSkeleton from "@/components/common/SeekerProfileSkeleton";

const SeekerProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [imagePreview, setImagePreview] = useState(
    user?.image ? user.image : "/default-profile.png"
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const SuccessPopRef = useRef(null);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user?.image) {
      setImagePreview(user.image);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

      if (loading) return <SeekerProfileSkeleton />; // 👈 ADD THIS


  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const profileData = {
      name: formData.get("name"),
      email: formData.get("email"),
      profession: formData.get("profession"),
      about: formData.get("about"),
      socialLinks: {
        linkedin: { url: formData.get("linkedin") },
        twitter: { url: formData.get("twitter") },
        github: { url: formData.get("github") },
      },
    };

    try {
      if (selectedImage) {
        const compressedFile = await imageCompression(selectedImage, {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });

        const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
        profileData.image = base64;
      }

      const response = await dispatch(updateProfile(profileData));

      if (response.meta.requestStatus === "fulfilled") {
        SuccessPopRef.current.click();
        dispatch(getUserProfile());
        setSelectedImage(null);
      } else {
        console.error("Update failed", response.error);
      }
    } catch (error) {
      console.error("Image compression or update error:", error);
    }
  };

  return (
    <Card className="px-2 mt-1 md:mt-6 border-none gap-0 ">
      <h1 className="text-2xl font-semibold mb-4 px-2">Personal Information</h1>

      <div className="flex bg-muted py-3 rounded-md px-4 gap-4 mb-6 ">
        <div>
          <HiInformationCircle />
        </div>
        <div className="text-[10px]">
          <h2 className="font-semibold">Tips</h2>
          <ul className="list-disc">
            <li className="font-normal">
              Adding your photo and social media profiles helps mentors feel confident that you're a real person (e.g. not a bot).
            </li>
          </ul>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <div className="flex gap-4 justify-start items-center mb-6">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          {selectedImage ? (
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2"></span>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2" /> Save
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              variant={"outline"}
              onClick={handleUploadClick}
              disabled={loading}
            >
              <Upload className="mr-2" /> Change Image
            </Button>
          )}
        </div>

        <div>
          <Label className="flex flex-col mb-4 justify-start items-start">
            Full Name
            <Input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="py-5"
              defaultValue={user?.name || ""}
              disabled={loading}
            />
          </Label>
        </div>

        <div>
          <Label className="flex flex-col justify-start items-start">
            Email Address
            <Input
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="py-5"
              defaultValue={user?.email || ""}
              disabled={loading}
            />
          </Label>
          <p className="text-xs mt-1 text-destructive">Only Visible to you</p>
        </div>

        <div className="mt-6">
          <Label className="flex flex-col mb-4 justify-start items-start">
            Profession
            <Input
              name="profession"
              type="text"
              placeholder="Enter your profession"
              className="py-5"
              defaultValue={user?.profession || ""}
              disabled={loading}
            />
          </Label>
        </div>

        <div className="mt-6">
          <Label className="flex flex-col mb-4 justify-start items-start">
            About Me
            <Textarea
              name="about"
              placeholder="Tell us about yourself"
              className="py-5 h-58"
              defaultValue={user?.about || ""}
              disabled={loading}
            />
          </Label>
        </div>

        <div className="mt-6">
          <Label className="flex flex-col mb-4 justify-start items-start">
            Social Media Links
            <Input
              name="linkedin"
              type="text"
              placeholder="Enter your LinkedIn profile URL"
              className="py-5 mb-4"
              defaultValue={user?.socialLinks?.linkedin?.url || ""}
              disabled={loading}
            />
            <Input
              name="twitter"
              type="text"
              placeholder="Enter your Twitter profile URL"
              className="py-5 mb-4"
              defaultValue={user?.socialLinks?.twitter?.url || ""}
              disabled={loading}
            />
            <Input
              name="github"
              type="text"
              placeholder="Enter your GitHub profile URL"
              className="py-5"
              defaultValue={user?.socialLinks?.github?.url || ""}
              disabled={loading}
            />
          </Label>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-primary-foreground"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white mr-2"></span>
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <button ref={SuccessPopRef} className="hidden">
            updatedSuccess
          </button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center justify-center gap-4 text-center py-8">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-green-700">
            Profile Updated!
          </h2>
          <p className="text-gray-500 max-w-sm">
            Your profile has been successfully updated. You can now continue
            exploring the platform.
          </p>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default SeekerProfile;