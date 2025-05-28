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
          <Card className=" mt-6 py-6   bg- rounded-lg   gap-5 items-start w-full">
          <CardContent className={'px-2 flex flex-row  items-center md:w-full  justify-between'}>
             <div className="flex flex-col   gap-5">
             <p className="text-4xl md:text-5xl md:w-92 font-normal"><span className="text-primary font-semibold">Define</span> your path and let us guide <br /> you</p>
            <Button  variant={'secondary'} className={'bg-secondary w-44 py-4 md:py-4'}>Book a session  <GiPaperPlane  size={10} /> </Button>
           </div>
           <div>
               <GiPaperPlane className="hidden text-destructive md:block" size={200} />
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

    
        <Card className="h-92 bg-card border-2 border-primary/20 hover:border-primary transition-all duration-500 group overflow-hidden relative">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  
  <CardContent className="relative z-10 px-8 py-12 flex flex-col items-center justify-center h-full">
    {/* Floating Elements */}
    <div className="absolute top-6 right-6 w-3 h-3 bg-primary/30 rounded-full animate-pulse"></div>
    <div className="absolute top-12 right-12 w-2 h-2 bg-destructive/40 rounded-full animate-pulse delay-300"></div>
    <div className="absolute bottom-8 left-6 w-4 h-4 bg-primary/20 rounded-full animate-pulse delay-700"></div>
    
    {/* Main Content */}
    <div className="text-center space-y-6 max-w-sm">
      {/* Badge */}
      <div className="inline-flex items-center px-4 py-2 bg-destructive/10 text-destructive text-sm font-medium rounded-full border border-destructive/20">
        <span className="w-2 h-2 bg-destructive rounded-full mr-2 animate-pulse"></span>
        Mentorship Program
      </div>
      
      {/* Title */}
      <div className="space-y-2">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-destructive bg-clip-text text-transparent leading-tight">
          Resume
        </h1>
        <h2 className="text-3xl font-semibold text-foreground/90">
          Review
        </h2>
      </div>
      
      {/* Subtitle */}
      <div className="flex items-center justify-center space-x-3">
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1"></div>
        <span className="text-lg font-medium text-muted-foreground px-3">
          For Freshers
        </span>
        <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent flex-1"></div>
      </div>
      
      {/* Stats */}
      <div className="flex justify-center space-x-8 pt-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">100+</div>
          <div className="text-xs text-muted-foreground">Reviews</div>
        </div>
        <div className="w-px h-12 bg-border"></div>
        <div className="text-center">
          <div className="text-2xl font-bold text-destructive">4.9</div>
          <div className="text-xs text-muted-foreground">Rating</div>
        </div>
      </div>
    </div>
    
    {/* Bottom accent */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-destructive to-primary opacity-60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
  </CardContent>
</Card>


     
    </div>
  );
};

export default SeekerHomePage;
