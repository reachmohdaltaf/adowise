import React from "react";
import FindExpertCard from "../components/FindExpertCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SeekerHomePage = () => {
  // 1. Define the card data
  const cardData = [
    {
      title1: "Internships",
      title2: "Gain",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/mentor1.png",
    },
    {
      title1: "Jobs",
      title2: "Explore",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/mentor1.png",
    },
    {
      title1: "Mentorships",
      title2: "Guidance",
      subtitle1: "practical",
      subtitle2: "Experience",
      image: "/mentor1.png",
    },
  ];

  return (
    <div className="md:py-6 gap-2 w-full flex flex-col">
      <Card className="w-full border-none shadow-none gap-0 py-0 px-0">
        <CardHeader className="px-0">
          <FindExpertCard />
          <CardContent className="px-0   mt-6 ">
            <h2 className="text-4xl sm:text-3xl   gap-10 font-normal  ">
              <span className="font-bold ">Unlock</span> Guidence
            </h2>
            <p className="text-xs sm:text-sm text-destructive font-normal">
              {" "}
              Book a session with unstoppable mentors across domains & work
            </p>
          </CardContent>

          <div className="grid grid-cols-1 mt-4 md:grid-cols-3 gap-2">
            {/* 2. Map over cardData */}
            {cardData.map((card, index) => (
              <Card key={index} className="bg-muted px-4 rounded-2xl">
                <div className="flex items-center">
                  {/* Text Content */}
                  <div className="flex-1">
                    <p className="text-lg font-semibold">{card.title1}</p>
                    <p className="text-lg font-semibold">{card.title2}</p>
                    <p className="text-sm font-normal">{card.subtitle1}</p>
                    <p className="text-sm font-normal">{card.subtitle2}</p>
                  </div>

                  {/* Image */}
                  <img
                    src={card.image}
                    alt="Mentor"
                    className="h-28 rounded-full object-cover "
                  />
                </div>
              </Card>
            ))}
            <CardContent className="px-0   mt-5 ">
              <h2 className="text-4xl sm:text-3xl   gap-10 font-normal  ">
                <span className="font-bold ">Top</span> Mentors
              </h2>
              <p className="text-xs sm:text-sm text-destructive font-normal">
                {" "}
                In search of excellence
              </p>
            </CardContent>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SeekerHomePage;
