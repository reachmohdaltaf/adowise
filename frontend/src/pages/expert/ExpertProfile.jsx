import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import imageCompression from "browser-image-compression";
import { HiInformationCircle } from "react-icons/hi2";
import { Save, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getUserProfile, updateProfile } from "@/redux/features/userThunk";

const ExpertProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [imagePreview, setImagePreview] = useState("/default-profile.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const fileInputRef = useRef(null);
  const successPopRef = useRef(null);

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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
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
  console.log("Original size:", (selectedImage.size / 1024).toFixed(2), "KB");

  const compressedFile = await imageCompression(selectedImage, {
    maxSizeMB: 0.2,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  });

  console.log("Compressed size:", (compressedFile.size / 1024).toFixed(2), "KB");

  const base64 = await imageCompression.getDataUrlFromFile(compressedFile);
  profileData.image = base64;
}


      const response = await dispatch(updateProfile(profileData));
      setFormLoading(false);

      if (response.meta.requestStatus === "fulfilled") {
        successPopRef.current.click();
        dispatch(getUserProfile());
        setSelectedImage(null);
      } else {
        console.error("Update failed", response.error);
      }
    } catch (error) {
      setFormLoading(false);
      console.error("Image compression or update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center">
        <span className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-primary"></span>
      </div>
    );
  }

  return (
    <Card className="px-2 mt-1 md:mt-6 border-none gap-0">
      <h1 className="text-2xl font-semibold mb-4 px-2">Personal Information</h1>

      {/* Tip Box */}
      <div className="flex bg-muted py-3 rounded-md px-4 gap-4 mb-6">
        <div>
          <HiInformationCircle />
        </div>
        <div className="text-[10px]">
          <h2 className="font-semibold">Tips</h2>
          <ul className="list-disc">
            <li className="font-normal">
              Adding your photo and social media profiles helps mentors feel
              confident that you're a real person (e.g., not a bot).
            </li>
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
        <div className="flex gap-4 justify-start items-center mb-6">
          <img
            src={imagePreview}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          {selectedImage ? (
            <Button type="submit" disabled={formLoading}>
              {formLoading ? (
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
              variant="outline"
              onClick={handleUploadClick}
              disabled={formLoading}
            >
              <Upload className="mr-2" /> Change Image
            </Button>
          )}
        </div>

        {/* Other Inputs */}
        <div>
          <Label className="flex flex-col mb-4 justify-start items-start">
            Full Name
            <Input
              name="name"
              type="text"
              placeholder="Enter your full name"
              className="py-5"
              defaultValue={user?.name || ""}
              disabled={formLoading}
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
              disabled={formLoading}
            />
          </Label>
          <p className="text-xs mt-1 text-destructive">Only visible to you</p>
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
              disabled={formLoading}
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
              disabled={formLoading}
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
              disabled={formLoading}
            />
            <Input
              name="twitter"
              type="text"
              placeholder="Enter your Twitter profile URL"
              className="py-5 mb-4"
              defaultValue={user?.socialLinks?.twitter?.url || ""}
              disabled={formLoading}
            />
            <Input
              name="github"
              type="text"
              placeholder="Enter your GitHub profile URL"
              className="py-5"
              defaultValue={user?.socialLinks?.github?.url || ""}
              disabled={formLoading}
            />
          </Label>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            disabled={formLoading}
            className="bg-primary text-primary-foreground"
          >
            {formLoading ? (
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
          <button ref={successPopRef} className="hidden">
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

export default ExpertProfile;
