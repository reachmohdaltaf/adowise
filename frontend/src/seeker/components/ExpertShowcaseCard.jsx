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
  tags,
}) => {
  // Round rating to nearest half for better star display
  const filledStars = Math.floor(rating);
  const totalStars = 5;

  return (
    <div>
      <Card
        className={
          "p-0  h-50  rounded-md  hover:shadow-sm transition  py-2 px-0 gap-0"
        }
      >
        <CardHeader className={"px-2 mb-0"}>
          <div className="flex gap-4">
            <div className="profile w-14 h-14 aspect-square overflow-hidden rounded-md">
              <img
                src={image || "https://via.placeholder.com/150"}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col w-72">
              <h2 className="font-bold h-6  text-lg overflow-ellipsis line-clamp-1">
                {title}
              </h2>

              <div className="RatingandPrice w-60  ">
                <div className="flex items-center mt-2  justify-start gap-5">
                  <span className="font-normal text-sm">₹ {price}</span>
                  <span className="flex gap-1 items-center">
                    <div className="rating flex  items-center">{rating}</div>
                    <div className="flex   items-center">
                      {[...Array(totalStars)].map((_, index) => (
                        <Star
                          key={index}
                          size={16}
                          fill={index < filledStars ? "#FFCE07" : "#ccc"}
                          stroke={index< filledStars ? "#FFCE07" : "#ccc" }
                        />
                      ))}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className={"px-2  py-0"}>
          <div className="flex mt-1 gap-2">
            {tags?.slice(0, 3).map((tag, index) => (
              <Button
                variant={"outline"}
                key={index}
                disabled
                className="text-xs  shadow-none rounded-full disabled:border-destructive disabled:text-black  py-0 h-6 px-3 text-gray-500 font-semibold"
              >
                {tag}
              </Button>
            ))}
          </div>
          <p className="text-sm h-10 mt-1 text-destructive font-normal line-clamp-1">
            {description}
          </p>
        </CardContent>
        <CardFooter
          className={"px-2 py-2"}
        >
          <div  className="flex pt-3 w-full  justify-between items-end gap-2">
            <p className="text-sm">
            by{" "}
            <span className="font-normal text-destructive text-sm">
              {author}
            </span>
          </p>
         
            {type == "1:1"? (
              <div className="flex items-center gap-2 font-normal"> <p className="font-normal ">Schedule a 1:1</p><span> <Video size={20}/></span></div>
            )
            :
            (
              <div className="flex items-center gap-2 font-normal"> <p className="font-normal">Send a Dm</p><span> <TbMessageStar size={20}/></span></div>
            )
          }
          </div>
         
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExpertShowcaseCard;
