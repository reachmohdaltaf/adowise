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

const ExpertShowcaseCard = ({
  title,
  price,
  rating,
  description,
  image,
  author,
  type,
  tags,
}) => {
  // Round rating to nearest half for better star display
  const filledStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div>
      <Card
        className={
          "p-0 cursor-pointer h-50 hover:bg-gradient-to-tr duration-200 hover:from-muted hover:to-background hover:shadow-sm transition  py-2 px-0 gap-0"
        }
      >
        <CardHeader className={"px-2 mb-0"}>
          <div className="flex gap-4">
            <div className="profile w-20 aspect-square  overflow-hidden rounded-md">
              <img
                src={image || "https:placeholder.com/150"}
                alt="profile"
                className="w-full h-20 object-cover"
              />
            </div>

            <div className="flex flex-col w-60">
              <h2 className="font-bold    line-clamp-2 h-12">{title}</h2>

              <div className="RatingandPrice w-60  ">
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
                <div className="flex flex-col gap-2 mt-1">
                  {/* Show only 3 tags */}
                  <div className="flex gap-2">
                    {tags?.slice(0, 3).map((tag, index) => (
                      <Button
                        variant={"outline"}
                        size={'sm'}
                        key={index}
                        className="text-xs py-0 h-6 px-3 text-gray-500 font-semibold"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className={"px-2  py-0"}>
          <p className="text-sm h-10 text-destructive font-normal line-clamp-2">
            {description}
          </p>
        </CardContent>
        <CardFooter className={"px-2 flex items-end justify-between gap-2 py-2"}>
          <p className="text-sm">
            by: <span className="font-normal text-sm">{author}</span>
          </p>
          <Button size={"sm"}>{type == "1:1" ? "Book Now" : "DM Now"}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpertShowcaseCard;
