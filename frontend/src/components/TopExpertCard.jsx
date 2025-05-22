import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import React from "react";

const TopExpertCard = () => {
  // Dummy Data
  const title = "John Doe - Expert Designer";
  const price = "5000";
  const rating = 4.5;
  const description = "Highly skilled designer with over 10 years of experience in creating visually appealing designs. Highly skilled designer with over 10 years of experience in creating visually appealing designs.";
  const author = "John Doe";

  // Round rating to nearest half for better star display
  const filledStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div>
      <Card
        className={
          "p-0 cursor-pointer hover:bg-gradient-to-tr  duration-200 hover:from-muted hover:to-background hover:shadow-sm transition py-2 px-0 gap-0 flex flex-col"
        }
      >
        <CardHeader className={"px-2 mb-0"}>
          <div className="flex gap-4">
            <div className="profile w-20 aspect-square overflow-hidden rounded-md">
              <img
                src={"https://picsum.photos/200"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-60">
              <h2 className="font-bold line-clamp-2">{title}</h2>

              <div className="RatingandPrice w-60">
                <div className="flex items-center justify-start gap-5">
                  <span className="font-normal text-xs">₹ {price}</span>
                  <span className="flex gap-1 items-center">
                    <CardDescription className="rating">
                      {rating}
                    </CardDescription>
                    <div className="flex mb-0.5 items-center">
                      {[...Array(totalStars)].map((_, index) => (
                        <Star
                          key={index}
                          size={14}
                          fill={index < filledStars ? "#000" : "none"}
                          stroke="#000"
                        />
                      ))}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className={"px-2 py-0 flex-grow"}>
          <p className="text-sm text-destructive font-normal line-clamp-2">
            {description}
          </p>
        </CardContent>
        <CardFooter className={"px-2 flex items-center justify-between gap-2 py-2"}>
          <p className="text-sm">
            by: <span className="font-normal text-sm">{author}</span>
          </p>
          <Button variant={''} className={'expert'} size={"sm"}>Send DM</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TopExpertCard;
