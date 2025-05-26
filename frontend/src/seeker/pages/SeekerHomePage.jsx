import React from "react";
import FindExpertCard from "../components/FindExpertCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { BsLightning } from "react-icons/bs";
import { Trophy } from "lucide-react";
import { GiTrophy } from "react-icons/gi";
import { HiTrophy } from "react-icons/hi2";

const SeekerHomePage = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log("userinfo", user);

  if(!user && loading){
    return <div>Loading...</div>
  }

  // Card data
  const cardData = [
    {
      title1: "Perfect",
      title2: "Mentor",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/man2.png",
    },
    {
      title1: "Jobs",
      title2: "Referral",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/man2.png",
    },
    {
      title1: "Mentorships",
      title2: "Guidance",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/man3.png",
    },
  ];

  // Background colors for each card
  const cardColors = ["#f0f5fe", "#fff9db", "#ffeef2"]; // light blue, light yellow, light pink

  // Top mentors data
  const topMentors = [
    {
      name: "Ankita Sharma",
      title: "Software Engineer @Google",
      image: "https://picsum.photos/200/300",
    },
    {
      name: "Rohit Verma",
      title: "Data Scientist @Amazon",
      image: "https://picsum.photos/200/300",
    },
    {
      name: "Sana Khan",
      title: "Product Manager @Meta",
      image: "https://picsum.photos/200/300",
    },
    {
      name: "Sana Khan",
      title: "Product Manager @Meta",
      image: "https://picsum.photos/200/300",
    },
  ];

  return (
    <div className="md:py-6 px-0 gap-2 w-full flex flex-col">
      <Card className="w-full border-none shadow-none mt-5 gap-0 py-0 px-0">
        <CardHeader className="px-1 mt2xl">
          <FindExpertCard user={user} />
          <CardContent className="px-0 mt-6">
            <h2 className="text-4xl sm:text-3xl gap-10 font-normal">
              Unlock Guidance
            </h2>
            <p className="text-xs sm:text-sm text-destructive font-normal">
              Book a session with unstoppable mentors across domains & work
            </p>
          </CardContent>

          <div className="grid grid-cols-1 mt-4 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {cardData.map((card, index) => {
              const bgColor = cardColors[index % cardColors.length];
              return (
                <Card
                  key={index}
                  className="px-2 py-6 rounded-2xl"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-2xl font-normal">{card.title1}</p>
                      <p className="text-2xl font-normal">{card.title2}</p>
                      <p className="text-sm font-normal">{card.subtitle1}</p>
                      <p className="text-sm font-normal">{card.subtitle2}</p>
                    </div>
                    <img
                      src={card.image}
                      alt="Mentor"
                      className="h-28 rounded-full object-cover"
                    />
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Top Mentors Section */}
        {/* Top Mentors Section */}
<CardContent className="px-0 mt-5">
  <h2 className="text-4xl sm:text-3xl gap-10 font-normal">
    <span className="font-normal">Top</span> Mentors
  </h2>
  <p className="text-xs sm:text-sm text-destructive font-normal">
    In search of excellence
  </p>
</CardContent>

{/* Carousel Container */}
<div className="w-full overflow-hidden mt-4">
  <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
    {topMentors.map((mentor, index) => (
      <div key={index} className="flex-shrink-0 snap-start">
        <Card
          className="rounded-2xl bg-[url('/bg33.png')] bg-cover bg-center shadow-md gap-2 py-4 px-4 w-72 text-center"
        >
          {/* Availability and Trophy */}
          <div className="flex justify-between items-start">
            <Button
              variant="outline"
              className="text-green-700 h-6 flex items-center text-sm"
            >
              <BsLightning className="mr-1" /> Available
            </Button>
            <span className="text-white text-2xl"><HiTrophy size={30} className=""/></span>
          </div>

          {/* Profile Image */}
          <img
            src={mentor.image}
            alt={mentor.name}
            className="h-32 w-32 object-cover rounded-full mx-auto border-4 border-gray-100"
          />

          {/* Name and Rating */}
          <p className="text-lg font-semibold text-gray-800">
            {mentor.name} <span className=" text-base">⭐ 4.9</span>
          </p>

          {/* Title */}
          <p className="text-sm text-gray-600">{mentor.title}</p>

          {/* View Profile Button */}
          <Button variant="outline" className="mt-2 py-6 rounded-full w-full">
            View Profile
          </Button>
        </Card>
      </div>
    ))}
  </div>
</div>

<style jsx>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`}</style>

        </CardHeader>
      </Card>
    </div>
  );
};

export default SeekerHomePage;