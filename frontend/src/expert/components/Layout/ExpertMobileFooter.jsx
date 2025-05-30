import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  PhoneCall,
  Briefcase,
  Heart,
  Calendar as Calendar1,
  BarChart2,
  Wallet2,
  Gift,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import { TbMessageStar } from "react-icons/tb";
import { Card, CardContent } from "@/components/ui/card";

const footerItems = [
  {
    label: "Home",
    icon: <HomeIcon size={22} />,
    path: "/expert/dashboard/home",
    activeCheck: (pathname) => pathname === "/expert/dashboard/home",
  },
  {
    label: "Bookings",
    icon: <PhoneCall size={22} />,
    path: "/expert/dashboard/bookings/upcoming",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/bookings"),
  },
  {
    label: "Priority",
    icon: <TbMessageStar size={22} />,
    path: "/expert/dashboard/priority-dm/pending",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/priority-dm"),
  },
  {
    label: "Services",
    icon: <Briefcase size={22} />,
    path: "/expert/dashboard/services/1-to-1",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/services"),
  },
  {
    label: "Profile",
    icon: <User size={22} />,
    path: "/expert/dashboard/profile",
    activeCheck: (pathname) => pathname.startsWith("/expert/dashboard/profile"),
  },
];

const ExpertMobileFooter = () => {
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

export default ExpertMobileFooter;