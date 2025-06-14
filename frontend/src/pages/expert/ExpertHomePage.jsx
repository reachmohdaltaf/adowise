import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import LeadRocketCard from "../../components/expert/LeadRocketCard";
import CompleteExpertProfileCard from "../../components/expert/CompleteExpertProfileCard";
import { Link } from "react-router-dom";

const ExpertHomePage = () => {
  return (
    <div className="py-6">
      <div className="flex md:flex-row flex-col gap-3 items-center">
        <LeadRocketCard />
        <CompleteExpertProfileCard />
      </div>

      <Card className=" mt-6  px-2  md:px-6 py-8 rounded-2xl  border-none space-y-6">
        <div className="">
          <h1 className="text-4xl font-bold tracking-tight">
            Turn Your Skills into Impact
          </h1>
        </div>

        <div className="border mb-10  rounded-xl p-6 px-4">
          <h2 className="text-2xl font-semibold mb-2">Add Services</h2>
          <p className="">Let people know what services you offer!</p>
          <Link to={"/expert/dashboard/services"}>
            <Button
              variant="outline"
              className="mt-4 text-foreground py-2 px-6 rounded-lg font-medium"
            >
              + Add
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ExpertHomePage;
