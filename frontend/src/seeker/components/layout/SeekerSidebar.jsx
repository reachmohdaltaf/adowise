import { Button } from "@/components/ui/button";
import { authCheck, logout } from "@/redux/features/authThunk";
import { updateUserRole } from "@/redux/features/userThunk";
import {
  Calendar1,
  Dock,
  Gift,
  HelpCircle,
  HomeIcon,
  LogOutIcon,
  Mail,
  Newspaper,
  Phone,
  PhoneCall,
  RefreshCcw,
  Search,
  Settings,
  User,
  Users2,
} from "lucide-react";
import React, { useCallback } from "react";
import { BsStars } from "react-icons/bs";
import { RiFileList3Line, RiUserStarLine } from "react-icons/ri";
import { TbMessageStar, TbRotate, TbUserStar } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiUsers } from "react-icons/hi2";
import { PiSirenLight, PiUserSwitch } from "react-icons/pi";

const SeekerSidebar = () => {
  const user = useSelector((state) => state.auth.user);
  const userRoleChanging = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const sidebarItems = [
    {
      label: "Home",
      icon: <HomeIcon className="!h-5 !w-5" />,
      path: "/seeker/dashboard/home",
    },
    {
      label: "Mentors",
      icon: <Users2 className="!h-5 !w-5" />,
      path: "/seeker/dashboard/mentors",
    },
    {
      label: "Bookings",
      icon: <PhoneCall className="!h-5 !w-5" />,
      path: "/seeker/dashboard/bookings/upcoming",
      activeCheck: (pathname) =>
        pathname.startsWith("/seeker/dashboard/bookings"),
    },
    {
      label: "Priority DM",
      icon: <TbMessageStar className="!h-5 !w-5" />,
      path: "/seeker/dashboard/priority-dm/sent-messages",
      activeCheck: (pathname) =>
        pathname.startsWith("/seeker/dashboard/priority-dm/answered-by-experts"),
    },
    { type: "divider" },
    {
      label: "Ai Search",
      icon: <BsStars className="!h-5 !w-5" />,
      path: "/seeker/dashboard/aisearch",
    },
    {
      label: "Rewards",
      icon: <Gift className="!h-5 !w-5" />,
      path: "/seeker/dashboard/rewards",
    },
    {
      label: "Profile",
      icon: <User className="!h-5 !w-5" />,
      path: `/seeker/dashboard/profile/${user._id}`,
    },
    { type: "divider" },
    {
      label: "Settings",
      icon: <Settings className="!h-5 !w-5" />,
      path: "/seeker/dashboard/settings",
    },
    {
      label: "What's New",
      icon: <PiSirenLight className="!h-5 !w-5" />,
      path: "/seeker/dashboard/whatsnew",
    },
    {
      label: "Help",
      icon: <HelpCircle className="!h-5 !w-5" />,
      path: "/seeker/dashboard/help",
    },
    { type: "divider" },
  ];

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleRoleChange = useCallback(async () => {
    try {
      await dispatch(updateUserRole({ userId: user._id, role: "expert" })).unwrap();
      await dispatch(authCheck()).unwrap();
      navigate("/expert/dashboard/home");
    } catch (error) {
      console.error("Role change failed", error);
      toast.error("Role change failed");
    }
  }, [dispatch, navigate, user._id]);

  return (
    <aside className="h-screen w-68 overflow-y-auto pt-5 bg-background flex flex-col justify-between z-10">
      <div className="flex-1 px-2 mt-8">
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item, index) =>
            item.type === "divider" ? (
              <div key={index} className="h-[1px] w-full bg-gray-200" />
            ) : (
              <Link to={item.path} key={index}>
                <Button
                  size="lg"
                  className={`flex items-center gap-3 font-semibold rounded-r-none rounded-l-2xl justify-start w-full
                    ${
                      item.activeCheck?.(location.pathname) ||
                      location.pathname === item.path
                        ? "bg-muted text-muted-foreground pointer-events-none"
                        : "hover:bg-secondary hover:text-foreground"
                    }
                  `}
                  variant="ghost"
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            )
          )}
        </ul>

        {/* Updated Role Change Button */}
        <Button
                 onClick={handleRoleChange}
                 size="lg"
                 className="mt-3 rounded-full font-semibold py-5 w-full flex items-center justify-center gap-2"
                 variant="default"
                 disabled={userRoleChanging}
               >
                 <RefreshCcw className={!userRoleChanging ? "" : "animate-spin"} />
                 Expert Dashboard
               </Button>
       

        <Link onClick={handleLogout} to="/login">
          <Button
            size="lg"
            className="flex gap-4 mb-9 mt-20 rounded-r-none rounded-l-2xl justify-start w-full"
            variant="secondary"
          >
            <LogOutIcon /> Logout
          </Button>
        </Link>
      </div>

      <div className="p-4 border-t"></div>
    </aside>
  );
};

export default SeekerSidebar;