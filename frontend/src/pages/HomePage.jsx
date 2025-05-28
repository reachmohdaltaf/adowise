import AiChatContainer from "@/components/common/AiChatContainer";
import { Marquee } from "@/components/magicui/marquee";
import TopExpertCard from "@/components/TopExpertCard";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ExpertShowcaseCard from "@/seeker/components/ExpertShowcaseCard";
import { ArrowUp, Mic, Plus } from "lucide-react";
import React from "react";

const HomePage = () => {
  return (
    <div className="pt-10 relative w-full">
      {/* Background section */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="w-full flex justify-between">
          <img src="/frame1.svg" className="h-[600px]  opacity-50 " alt="" />
          <img src="/frame2.svg" className="h-[600px] md:block hidden opacity-50" alt="" />
        </div>
      </div>

      {/* Foreground content */}
      <section className="relative flex items-center justify-center mt-20 ">
        <img src="/logo5.png" className="h-16 md:h-32 " alt="" />
      </section>

      {/* @section chat container */}
      <section className="mt-18 md:mt-10 px-2 ">
        {/* glassmorphism container  */}
        <div className="max-w-screen-md px-4 mx-auto">
          <h2 className="lg:text-sm text-sm sm:text-xs md:text-sm">Looking for a mentor? Start by asking here...</h2>
        </div>
        <AiChatContainer />
      </section>
      <section className="relative justify  flex mt-20 md:mt-52 ">
        <div className="w-full flex justify-between">
          <img src="/frame1.svg" className="h-[600px] hidden md:block opacity-50" alt="" />
          <img src="/frame2.svg" className="h-[600px] hidden" alt="" />
        </div>
        <div className="absolute gap-2 top-0 left-0 w-full h-full md:flex   justify-between gap-10 px-2 md:px-6">
          <Card className="h-96 md:w-1/3 bg-gradient-to-br expert from-primary/90 to-primary/10 backdrop-blur-xl rounded-3xl border-none  flex flex-col items-center justify-center text-white px-6">
            <h2 className="text-5xl font-bold mb-4">Apply to Jobs Referral</h2>
            <p className="text-base font-medium mb-8">
              Boost your chances by applying to jobs through employee referrals.
              Stand out to recruiters!
            </p>
            <Button className={"py-6 w-full text-xl"} variant={"colored"}>
              Get Started
            </Button>
          </Card>

          <Card className={"md:w-2/3 md:mt-0 mt-10 py-2 bg-transparent border-none"}>
            <Marquee vertical={true} speed={60}>
              <TopExpertCard />
            </Marquee>
          </Card>
        </div>
      </section>
      <section className=" px-6  hidden md:block">
        <div className="relative">

          <h2 className="absolute top-[-150px] text-8xl font-bold w-60">
            <span className="expert text-muted-foreground">Your</span> Career
            Questions, Already Answered..
          </h2>
        </div>
        <div className=" flex justify-around ">
          <div></div>
          <img src="/arrow.svg" className="h-[500px] mt-20" alt="" />
        </div>
      </section>
      
      
    </div>
  );
};

export default HomePage;
