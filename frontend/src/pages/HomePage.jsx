import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  // Button texts for the second section (How it works?)
  const secondSectionButtons = [
    "How it works ?",
    "How it works ?",
    "How it works ?",
    "How it works ?",
    "How it works ?",
  ];

  return (
    <div className="flex flex-col scroll-smooth items-center justify-center">
      {/* First Section */}
      <section className="relative overflow-hidden h-[500px] w-full">
        <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background">
          <h2 className="bogue text-[44px] text-center md:text-5xl lg:text-7xl max-w-3xl leading-snug">
            {" "}
            Your Dream Career Starts Here
          </h2>
          <Link to="/seeker/dashboard/home">
            <Button
              className="py-6 px-6 text-base md:text-lg md:py-7 
             scale-96 hover:scale-100 
             relative z-10 "
            >
              Get Started
            </Button>
          </Link>
        </div>
        
       
      </section>

     

      {/* Second Section */}

      {/* Third Section */}
      <section className="py-10 px-2  mt-16 flex items-center justify-center w-full bg-[#C7DBFA]">
        <Card
          className={
            "w-full max-w-[700px] rounded-4xl bg-background px-2 gap-2 h-full"
          }
        >
          {secondSectionButtons.map((text, index) => (
            <Button
              key={index}
              className="bg-[#AAC9F7] text-foreground hover:bg-[#AAC9F7] h-16 sm:h-12 md:h-16 lg:h-20 rounded-3xl text-xl sm:text-sm md:text-xl lg:text-3xl font-semibold scale-96 hover:scale-100 justify-between border-2 border-foreground mb-4"
            >
              <p>{text}</p>
              <span>+</span>
            </Button>
          ))}
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
