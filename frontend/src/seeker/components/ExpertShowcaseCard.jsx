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
import { useNavigate } from "react-router-dom";

const ExpertShowcaseCard = ({
  id,
  title,
  price,
  rating,
  description,
  image,
  author,
}) => {
  // Round rating to nearest half for better star display
  const navigate = useNavigate();
  const filledStars = Math.floor(rating);
  const totalStars = 5;

  const handleClick = () => {
    navigate(`/seeker/dashboard/profile/${id}`)
  };
  return (
    <div>
      <Card
       
        className={
          "p-0 cursor-pointer hover:bg-gradient-to-tr duration-200 hover:from-muted hover:to-background hover:shadow-sm transition  py-2 px-0 gap-0"
        }
      >
        <CardHeader  onClick={handleClick} className={"px-2 mb-0"}>
          <div className="flex gap-4">
            <div className="profile w-20 aspect-square  overflow-hidden rounded-md">
              <img
                src={image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-60">
              <h2 className="font-bold    line-clamp-2">{title}</h2>

              <div  className="RatingandPrice w-60  ">
                <div className="flex items-center justify-start gap-5">
                  <span className="font-normal text-xs">₹ {price}</span>
                  <span className="flex gap-1 items-center">
                    <CardDescription  className="rating">
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
        <CardContent  onClick={handleClick} className={"px-2  py-0"}>
          <p className="text-sm text-destructive font-normal h-14">
            {description}
          </p>
          
        </CardContent>
        <CardFooter className={"px-2 flex justify-between gap-2 py-2"}>
          <p className="text-sm">
            by: <span className="font-normal text-sm">{author}</span>
          </p>
          <Button size={"sm"}>Send DM</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpertShowcaseCard;
