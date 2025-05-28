import React, { useRef } from "react";
import FindExpertCard from "../components/FindExpertCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { BsLightning } from "react-icons/bs";
import { Trophy } from "lucide-react";
import { GiPaperPlane, GiTrophy } from "react-icons/gi";
import { HiTrophy } from "react-icons/hi2";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SeekerHomePage = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const carouselRef = useRef(null);
  console.log("userinfo", user);

  if (!user && loading) {
    return <div>Loading...</div>;
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Background colors for each card

  // Top mentors data
  const topMentors = [
    {
      name: "Mohd Altaf",
      title: "Software Engineer @adowise",
      image: "https://avatars.githubusercontent.com/u/178491093?v=4",
    },
    {
      name: "Rohit Verma",
      title: "Data Scientist @Amazon",
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
  ];

  return (
    <div className="md:py-6 px-0 gap-2 w-full flex flex-col">
      <Card className="w-full border-none shadow-none mt-5 gap-0 py-0 px-0">
        <CardHeader className="px-0">
          <FindExpertCard user={user} />
         

          {/* // card content  */}
          <Card className=" mt-6   bg- rounded-lg   gap-5 items-start w-full">
          <CardContent className={'px-2 flex flex-row  items-center md:w-full  justify-between'}>
             <div className="flex flex-col   gap-5">
             <p className="text-4xl md:text-5xl md:w-92 font-normal"><span className="text-primary font-semibold">Define</span> your path and let us guide <br /> you</p>
            <Button  variant={'secondary'} className={'bg-secondary w-44 py-4 md:py-6'}>Book a session  <GiPaperPlane  size={10} /> </Button>
           </div>
           <div>
               <GiPaperPlane className="hidden md:block" size={200} />
           </div>
          </CardContent>
          </Card>

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
          <div className="relative w-full overflow-hidden mt-4">
            {/* Navigation Arrows - Only visible on large screens */}
            <button
              onClick={scrollLeft}
              className="absolute opacity-50 hover:opacity-100  cursor-pointer left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden lg:flex items-center justify-center"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>

            <button
              onClick={scrollRight}
              className="absolute opacity-50 hover:opacity-100 cursor-pointer right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors hidden lg:flex items-center justify-center"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>

            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {topMentors.map((mentor, index) => (
                <div key={index} className="flex-shrink-0 snap-start">
                  <Card className="rounded-xl bg-[url('/logo66.png')] bg-cover bg-center shadow-md gap-2 py-3 px-3 w-60 text-center">
                    {/* Availability and Trophy */}
                    <div className="flex justify-between items-start">
                      {/* <Button
                        variant="outline"
                        className="text-green-700 h-5 px-2 py-0 text-xs"
                      >
                        <BsLightning className="mr-1 h-3 w-3" /> Available
                      </Button> */}
                      <div></div>
                      <span className="text-white text-xl">
                        <HiTrophy size={28} />
                      </span>
                    </div>

                    {/* Profile Image */}
                    <img
                      src={mentor.image}
                      alt={mentor.name}
                      className="h-24 w-24 object-cover rounded-full mx-auto border-2 border-gray-100"
                    />

                    {/* Name and Rating */}
                    <p className="text-base font-semibold text-background">
                      {mentor.name} 
                    </p>

                    {/* Title */}
                    <p className="text-xs text-secondary">{mentor.title}</p>

                    {/* View Profile Button */}
                    <Button
                      variant="outline"
                      className="mt-2 py-4 text-sm rounded-full w-full"
                    >
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
