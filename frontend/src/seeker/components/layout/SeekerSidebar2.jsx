import { Button } from "@/components/ui/button";
import {
  Calendar1,
  Dock,
  Gift,
  HelpCircle,
  HomeIcon,
  LogOutIcon,
  Mail,
  Phone,
  PhoneCall,
  Search,
  Settings,
  Star,
  StarIcon,
  User,
  Users2,
  X,
} from "lucide-react";
import React, { useCallback } from "react";
import { BsStarFill, BsStars } from "react-icons/bs";
import { TbMessageStar } from "react-icons/tb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiUserStarLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { authCheck, logout } from "@/redux/features/authThunk";
import { updateUserRole } from "@/redux/features/userThunk";
import { toast } from "react-toastify";
import { HiUsers } from "react-icons/hi2";
import { PiSirenLight } from "react-icons/pi";


const SeekerSidebar2 = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.auth.user);
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
      icon: <PiSirenLight  className="!h-5 !w-5" />,
      path: "/seeker/dashboard/whatsnew",
    },
    {
      label: "Help",
      icon: <HelpCircle className="!h-5 !w-5" />,
      path: "/seeker/dashboard/help",
    },
    { type: "divider" },
  ];
  const userRoleChanging = useSelector((state) => state.user.loading);
  const navigate = useNavigate();
  console.log({ "userID in sidebar": user._id, role: user.role });
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

const handleRoleChange = useCallback(async () => {
  try {
    await dispatch(updateUserRole({ userId: user._id, role: "expert" })).unwrap();
    await dispatch(authCheck()).unwrap();
    // Optional: dispatch an action to preserve current services data if needed
    navigate("/expert/dashboard/home");
  } catch (error) {
    console.error("Role change failed", error);
    toast.error("Role change failed");
  }
}, [dispatch, navigate, user._id]);

  return (
    <aside className=" h-screen  w-72 md:w-82 overflow-y-auto bg-background  flex flex-col justify-between z-10">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-end mr-3 mt-6 cursor-pointer "
      >
        <X />
      </div>

      <div className="flex-1 px-2 mt-6">
        <Link to={`/seeker/dashboard/profile/${user._id}`} onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-4 bg-muted py-4 rounded-xl">
          <img
            src={
              user.image
                ? user.image
                : "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
            }
            alt="profile"
            className="h-10 w-12 rounded-full object-cover"
          />
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="flex bg-muted-foreground rounded-md text-white px-2 items-center text-sm gap-1">
                <BsStarFill size={10} /> {user.rating || 6}
              </p>
            </div>
            <p className="text-destructive text-sm font-normal">@{user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col mt-4 gap-2">
          {sidebarItems.map((item, index) =>
            item.type === "divider" ? (
              <div key={index} className="h-[1px] bg-border w-full " />
            ) : (
              <Link
                onClick={() => setIsOpen(!isOpen)}
                to={item.path}
                key={index}
              >
                <Button
                  size="lg"
                  className={`flex items-center gap-3 transition ease-in duration-200 font-semibold rounded-r-none rounded-l-2xl justify-start w-full
                    ${
                      location.pathname === item.path
                        ? "bg-muted text-muted-foreground pointer-events-none transition-none"
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
        <Button
          onClick={handleRoleChange}
          size="lg"
          className="mt-3 rounded-full font-semibold py-5 w-full flex items-center justify-center gap-2"
          variant=""
          disabled={userRoleChanging} // disable button while loading
        >
          {userRoleChanging ? (
            <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-black"></span>
          ) : (
            <RiUserStarLine className="!h-5 !w-5" />
          )}
          {userRoleChanging ? "Switching..." : "Expert Dashboard"}
        </Button>

        <Button
          size="lg"
          className="flex gap-4 mb-9 mt-20 rounded-r-none rounded-l-2xl justify-start w-full"
          variant="secondary"
          onClick={handleLogout}
        >
          <LogOutIcon /> Logout
        </Button>
      </div>

      <div className="p-4 border-t"></div>
    </aside>
  );
};

export default SeekerSidebar2;
