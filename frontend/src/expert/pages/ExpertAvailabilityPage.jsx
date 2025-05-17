import React from "react";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";

const ExpertAvailabilityPage = () => {
  const { pathname } = useLocation();
  const isUpcoming = pathname.includes("availability/calendar");

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold mb-4 px-2">Availability</h1>

      <div className="flex justify-between gap-4 mb-6">
        <div className="gap-3 flex">
          <Link to="calendar">
            <Button variant={isUpcoming ? "default" : "outline"}>
              Calendar
            </Button>
          </Link>
          <Link to="schedule">
            <Button variant={!isUpcoming ? "default" : "outline"}>
              Schedule
            </Button>
          </Link>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ExpertAvailabilityPage;
