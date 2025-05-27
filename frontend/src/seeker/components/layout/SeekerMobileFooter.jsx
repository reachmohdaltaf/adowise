import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HomeIcon, PhoneCall, Search } from "lucide-react";
import { HiUser } from "react-icons/hi2";
import { TbCategory } from "react-icons/tb";
import { Card, CardContent } from "@/components/ui/card";

const footerItems = [
  {
    label: "Home",
    icon: <HomeIcon size={22} />,
    path: "/seeker/dashboard/home",
    activeCheck: (pathname) => pathname === "/seeker/dashboard/home",
  },
  {
    label: "Bookings",
    icon: <PhoneCall size={22} />,
    path: "/seeker/dashboard/bookings/upcoming",
    activeCheck: (pathname) =>
      pathname.startsWith("/seeker/dashboard/bookings"),
  },
  {
    label: "Search",
    icon: <Search size={22} />,
    path: "/seeker/dashboard/search",
    activeCheck: (pathname) => pathname.startsWith("/seeker/dashboard/search"),
  },
  {
    label: "Profile",
    icon: <HiUser size={22} />,
    path: "/seeker/dashboard/profile/id",
    activeCheck: (pathname) => pathname.startsWith("/seeker/dashboard/profile/id"),
  },
  {
    label: "Category",
    icon: <TbCategory size={22} />,
    path: "/seeker/dashboard/category",
    activeCheck: (pathname) =>
      pathname.startsWith("/seeker/dashboard/category"),
  },
];

const SeekerMobileFooter = () => {
  const location = useLocation();

  return (
    <Card className="bg-background border-gray-200 shadow-sm rounded-t-2xl rounded-b-none py-3">
      <CardContent className="px-2 items-center gap-4 flex justify-around">
        {footerItems.map((item) => {
          const isActive = item.activeCheck(location.pathname);

          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex cursor-pointer flex-col gap-1 items-center"
            >
              <div
                className={`${
                  isActive ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {item.icon}
              </div>
              <p
                className={`text-[12px] ${
                  isActive ? "text-muted-foreground" : "text-foreground"
                }`}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SeekerMobileFooter;
