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
      size="sm"
      className="shimmer-button"
      variant="colored"
    >
      <GiElectric className="mr-1" />
      Find Expert
    </Button>
  </DialogTrigger>

  <DialogContent className="flex flex-col items-center gap-6 text-center rounded-2xl bg-muted shadow-xl max-w-md mx-auto">
    <DialogHeader>
      <DialogTitle className="flex flex-col items-center gap-2">
        <div className="relative">
          <img
            src="/logo.png"
            className="h-28 w-28 animate-pulse drop-shadow-lg"
            alt="AI Searching"
          />
         
        </div>
        <p className="text-lg font-semibold">Searching for the right expert…</p>
      </DialogTitle>
    </DialogHeader>

    <div className="w-full">
      <Progress value={33} className="w-full bg-secondary h-2 rounded-full" />
    </div>

    <div className="flex items-center gap-2 text-muted-foreground text-sm">
      <Loader2 className="animate-spin h-4 w-4" />
      <span className="animate-pulse">Thinking, please hold on…</span>
    </div>

    <div className="flex items-center justify-center gap-1 mt-2 text-sm text-muted-foreground">
      <span className="animate-bounce delay-0">.</span>
      <span className="animate-bounce delay-150">.</span>
      <span className="animate-bounce delay-300">.</span>
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
