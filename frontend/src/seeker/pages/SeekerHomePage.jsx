import React from "react";
import FindExpertCard from "../components/FindExpertCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSelector } from "react-redux";

const SeekerHomePage = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log("userinfo", user);

  if(!user && loading){
    return <div>Loading...</div>
  }

  // Card data
  const cardData = [
    {
      title1: "Interview",
      title2: "Preparation",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/mentor1.png",
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
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Rohit Verma",
      title: "Data Scientist @Amazon",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
    },
    {
      name: "Sana Khan",
      title: "Product Manager @Meta",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="md:py-6 gap-2 w-full flex flex-col">
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

          <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-2">
            {cardData.map((card, index) => {
              const bgColor = cardColors[index % cardColors.length];
              return (
                <Card
                  key={index}
                  className="px-4 rounded-2xl"
                  style={{ backgroundColor: bgColor }}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-2xl font-semibold">{card.title1}</p>
                      <p className="text-2xl font-semibold">{card.title2}</p>
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

<div className="grid grid-cols-1 mt-2 md:grid-cols-3 gap-2">
  {topMentors.map((mentor, index) => (
    <Card
      key={index}
      className="rounded-2xl p-4 bg-white"
    >
      <div className="flex justify-between items-center">
        <img
          src={mentor.image}
          alt={mentor.name}
          className="h-20 w-20 object-cover rounded-full"
        />
        <div className="text-right">
          <p className="text-lg font-semibold">{mentor.name}</p>
          <p className="text-sm text-gray-600">{mentor.title}</p>
        </div>
      </div>
    </Card>
  ))}
</div>

        </CardHeader>
      </Card>
    </div>
  );
};

export default SeekerHomePage;
