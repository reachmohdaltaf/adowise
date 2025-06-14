import React, { useRef } from "react";
import FindExpertCard from "../components/FindExpertCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { BsLightning } from "react-icons/bs";
import { Sparkle, SparkleIcon, Sparkles, Star, Trophy, Users } from "lucide-react";
import { GiPaperPlane, GiTrophy } from "react-icons/gi";
import { HiTrophy } from "react-icons/hi2";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  const progress = 60; // You can make this dynamic

  return (
    <div className="md:py-6 px-0 gap-2 w-full flex flex-col">
      <Card className="w-full border-none shadow-none mt-5 gap-0 py-0 px-0">
        <CardHeader className="px-0">
          <FindExpertCard user={user} />

          <Card className="h-80 w-full rounded-xl text-foreground  flex flex-col justify-between relative overflow-hidden border border-primary">
      <CardContent className="flex flex-col gap-4 h-full relative z-10">
        {/* Top: Icon and Title */}
        <div className="flex items-center gap-3">
          <HiTrophy size={32} className="text-primary" />
          <h2 className="text-xl font-bold">Start Unlocking Rewards!</h2>
        </div>

        {/* Description */}
        <p className="text-sm text-destructive font-normal">
          Earn points by learning, mentoring, and participating. Redeem them
          for exciting perks and badges.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <Button className="px-4 py-2 rounded-md shadow-md">
            Explore Rewards <Sparkles className="ml-2 h-4 w-4" />
          </Button>

        </div>
      </CardContent>

      {/* Folded Corner Design */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-primary rotate-45 translate-x-1/2 -translate-y-1/2 shadow-md" />

      {/* Watermark Icon */}
      <div className="absolute -bottom-4 -right-4 opacity-10">
        <HiTrophy size={140} className="text-primary" />
      </div>
    </Card>

          {/* // card content  */}
          <Card className=" mt-3     rounded-lg   gap-3 items-start w-full">
            <CardContent
              className={
                "px-2 flex flex-row  items-center md:w-full  justify-between"
              }
            >
              <div className="flex flex-col   gap-5">
                <p className="text-2xl md:text-2xl font-normal">
                  <span className=" font-semibold">Define</span> your path and
                  let us guide you
                </p>
                <Button
                  variant={"secondary"}
                  className={"bg-secondary w-44 py-4 md:py-4"}
                >
                  Book a session <GiPaperPlane size={10} />{" "}
                </Button>
              </div>
              <div></div>
            </CardContent>
          </Card>
        </CardHeader>
      </Card>
    </div>
  );
};

export default SeekerHomePage;
