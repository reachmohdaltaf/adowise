import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useSelector } from 'react-redux';

const SeekerProfile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log("profile", user)
  return (
    <div className=" mx-auto md:mt-10 md:px-4">
      {/* Profile Card */}
      <Card className="gap-0 px-0 py-0">
        {/* Banner & Profile Image */}
        <CardHeader className="px-0 py-0 relative">
          <div className=" h-20 md:h-40 rounded-t-2xl bg-primary w-full" />

          <img
            src={user.image || 'https://dummyimage.com/600x400/000/fff'}
            className="h-28 w-28 border-4 border-destructive rounded-full object-cover -mt-12 ml-4 bg-white shadow-md"
            alt="Profile"
          />
        </CardHeader>

        {/* Profile Content */}
        <CardContent className="px-4 pb-6">
          {/* Top Row: Name + Button */}
          <div className="flex justify-between items-start flex-wrap gap-3">
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.profession}</p>
            </div>

            <Button variant="outline" className="rounded-full text-sm">
              ✏️ Edit Profile
            </Button>
          </div>

          {/* Details */}
          <div className="mt-4 text-sm  text-muted-foreground">
            <p><strong>Location:</strong> New York, USA</p>
            <p><strong>Email:</strong>{user.email}</p>
          </div>

          {/* Skills */}
          <div className="mt-4">
            <p className="font-medium mb-1">Skills:</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-secondary text-sm px-3 py-1 rounded-full">Figma</span>
              <span className="bg-secondary text-sm px-3 py-1 rounded-full">Adobe XD</span>
              <span className="bg-secondary text-sm px-3 py-1 rounded-full">UI Design</span>
              <span className="bg-secondary text-sm px-3 py-1 rounded-full">Prototyping</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="font-medium mb-1">About:</p>
            <p className="text-sm text-gray-700">
              I'm a passionate designer focused on building accessible and beautiful interfaces with user-centric thinking.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeekerProfile;
