import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star, Video } from "lucide-react";
import React from "react";
import { TbMessageStar } from "react-icons/tb";
import { Link } from "react-router-dom";

const ExpertShowcaseCard = ({
  title,
  price,
  rating,
  description,
  image,
  author,
  type,
}) => {
  // Round rating to nearest half for better star display
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  
  return (
    <div>
      <Card
        className={
          " h-50 shadow-none  hover:shadow-sm transition duration-300 text-foreground border-gray-200 rounded-lg   py-2 px-0 gap-0"
        }
      >
        <CardHeader className={"px-2 mb-0"}>
          <div>

          </div>
          <div className="flex gap-2">
            <div className="profile w-14 h-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-200">
              <img
                src={image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"}
                alt={`${author}'s profile`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face";
                }}
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
             <div className="Title h-12"> <h2 className="font-semibold text-[16px] text-[#212121]   line-clamp-2">
                {title}
              </h2></div>
              <div className="RatingandPrice ">
                <div className="flex items-center mt-2 justify-start gap-2">
                  <span className="font-normal text-sm">₹ 100</span>
                  <span className="flex gap-1 items-center">
                    <div className="rating flex items-center text-xs border rounded-lg px-2 font-normal gap-2"> <Star size={12} /> <p className="">{rating}</p></div>
                    
                  </span>
                </div>
              </div>
            
            </div>
          </div>
        </CardHeader>
         <div className="h-18 px-2 py-1">
               <p className="text-sm h-10  text-destructive font-normal line-clamp-1">
                {description}
              </p>
             </div>
               <div className={"px-2"}>
          <div className="flex  w-full justify-between items-end gap-2">
            <p className="text-sm">
              by{" "}
              <span className="font-normal text-destructive text-sm">
                {author}
              </span>
            </p>
            {type === "1:1" ? (
              <div className="flex items-center gap-2 font-normal">
                <p className="font-normal text-sm">Schedule a 1:1</p>
                <span>
                  <Video size={20} />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 font-normal">
                <p className="font-normal text-sm">Send a Dm</p>
                <span>
                  <TbMessageStar size={20} />
                </span>
              </div>
            )}
          </div>
        </div>
       
      </Card>
    </div>
  );
};

export default ExpertShowcaseCard;