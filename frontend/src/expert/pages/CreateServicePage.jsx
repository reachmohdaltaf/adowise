import React from "react";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";


const CreateServicePage = () => {
  const { pathname } = useLocation();

  const is1to1 = pathname.includes("1-to-1");
  const isDm = pathname.includes("dm");
  const isWebinar = pathname.includes("webinar");

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold mb-4 px-2">Create Services</h1>
        <p>Select Type</p>
      <div className="flex justify-between mt-3 gap-4 mb-2  ">
        <div className="gap-3 flex">
          <Link to="1-to-1">
            <Button className={' rounded-2xl '} variant={is1to1 ? "default" : "outline"}>1 : 1</Button>
          </Link>
          <Link to="dm">
            <Button className={'  rounded-2xl '} variant={isDm ? "default" : "outline"}>Priority DM</Button>
          </Link>
          <Link to="webinar">
            <Button className={' rounded-2xl '} variant={isWebinar ? "default" : "outline"}>Webinar</Button>
          </Link>
        </div>

      
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default CreateServicePage;
