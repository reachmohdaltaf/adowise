import React from "react";
import { Button } from "@/components/ui/button";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ExpertServicePage = () => {
  const { pathname } = useLocation();

  const is1to1 = pathname.includes("1-to-1");
  const isDm = pathname.includes("dm");
  const isWebinar = pathname.includes("webinar");

  return (
    <div className="py-6 ">
      <h1 className="text-2xl font-semibold mb-6  px-2">Services</h1>

<div className="flex sticky top-12 z-20 border-b py-2 bg-background justify-between gap-4 mb-6">
        <div className="gap-3 flex">
          <Link to="1-to-1">
            <Button size={''} className={' rounded-2xl md:px-6 px-3 '} variant={is1to1 ? "default" : "outline"}>1 : 1</Button>
          </Link>
          <Link to="dm">
            <Button size={''} className={'  rounded-2xl md:px-6 px-3 '} variant={isDm ? "default" : "outline"}>Priority DM</Button>
          </Link>
          <Link to="webinar">
            <Button size={''} className={'rounded-2xl md:px-6 px-3 '} variant={isWebinar ? "default" : "outline"}>Webinar</Button>
          </Link>
        </div>

        <div className="flex  gap-3">
          <Dialog className="">
            <DialogTrigger asChild>
              <Button size={'icon'}>  +</Button>
            </DialogTrigger>
            <DialogContent className="h-auto  max-w-2xl">
              <DialogHeader>
                <DialogTitle>What are you creating today?</DialogTitle>
                <DialogDescription>Select a type to continue</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
  {[
    {
      title: "1:1 Call",
      description: "Conduct 1:1 video sessions",
      link: "/expert/dashboard/create/service/1-to-1",
    },
    {
      title: "Priority DM",
      description: "Setup your priority inbox",
      link: "/expert/dashboard/create/service/dm",
    },
    {
      title: "Webinar",
      description: "Host one time or recurring group sessions",
      link: "/expert/dashboard/create/service/webinar",
    },
    // {
    //   title: "Digital Product",
    //   description: "Sell digital products, courses, paid videos & more",
    //   link: "/expert/dashboard/create/service/digital-product",
    // },
    // {
    //   title: "Package",
    //   description: "Bundle your offerings into one",
    //   link: "/expert/dashboard/create/service/package",
    // },
  ].map((item, index) => (
    <Link to={item.link} key={index}>
      <button
        className="w-full  rounded-xl cursor-pointer border p-4 text-left hover:border-primary hover:bg-muted transition"
      >
        <h3 className="font-medium  text-lg">{item.title}</h3>
        <p className="text-sm text-destructive ">{item.description}</p>
      </button>
    </Link>
  ))}
</div>
            </DialogContent>
          </Dialog>

          <Dialog className="hidden">
            <DialogTrigger className="hidden" asChild>
              <Button>Use Templates</Button>
            </DialogTrigger>
            <DialogContent className="h-auto max-w-2xl">
              <DialogHeader>
                <DialogTitle>What are you creating today?</DialogTitle>
                <DialogDescription>Select a type to continue</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {[
                  {
                    title: "1:1 Call",
                    description: "Conduct 1:1 video sessions",
                  },
                  {
                    title: "Priority DM",
                    description: "Setup your priority inbox",
                  },
                  {
                    title: "Webinar",
                    description: "Host one time or recurring group sessions",
                  },
                  {
                    title: "Digital Product",
                    description: "Sell digital products, courses, paid videos & more",
                  },
                  {
                    title: "Package",
                    description: "Bundle your offerings into one",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    className="rounded-xl cursor-pointer border p-4 text-left hover:border-primary hover:bg-muted transition"
                  >
                    <h3 className="font-medium text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ExpertServicePage;
