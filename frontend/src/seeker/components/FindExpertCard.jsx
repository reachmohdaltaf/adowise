import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GiElectric } from "react-icons/gi";
const FindExpertCard = () => {
  return (
      <Card className="w-full border-none gap-2 px-2  py-0  rounded-md overflow-x-auto">
        <CardHeader className="px-0  ">
        <div>
          <div className="flex justify-between items-center w-full">
              <p className="text-4xl sm:text-4xl font-normal">Hi, Altaf</p>
                          <Button size={'sm'} className={'shimmer-button'} variant={'colored'}><GiElectric/> Mentor Match</Button>

          </div>

          <span className="text-xs sm:text-sm text-destructive font-normal">
            Welcome to Your Dashboard
          </span>
        </div>

        </CardHeader>

       
      </Card>
  );
};

export default FindExpertCard;
