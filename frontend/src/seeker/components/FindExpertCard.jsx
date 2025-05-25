import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GiElectric } from "react-icons/gi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
const FindExpertCard = ({ user }) => {
  return (
    <Card className="w-full border-none gap-2 px-0  py-0  rounded-md overflow-x-auto">
      <CardHeader className="px-0  ">
        <div>
          <div className=" flex justify-between items-center w-full">
            {/* show only first name  */}
            <p className="text-4xl sm:text-4xl font-normal">
              Hi, {user.name.split(" ")[0]}
            </p>
           <Dialog>
              <DialogTrigger asChild>
                 <Button
              size={"sm"}
              className={"shimmer-button"}
              variant={"colored"}
            >
              <GiElectric />
              Find Expert
            </Button>
              </DialogTrigger>
             <DialogContent className="flex flex-col items-center gap-4 text-center">
  <DialogHeader>
    <DialogTitle className="text-lg font-semibold">
      <img src="/mentor.png" className="h-40" alt="" />
      Finding a mentor…
    </DialogTitle>
  </DialogHeader>
  <Progress value={33}  className="w-full bg-secondary " />
  <div className="flex items-center gap-2 text-muted-foreground text-sm">
    <Loader2 className="animate-spin h-4 w-4" />
    Please wait while we connect you with an expert.
  </div>
</DialogContent>

           </Dialog>
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
