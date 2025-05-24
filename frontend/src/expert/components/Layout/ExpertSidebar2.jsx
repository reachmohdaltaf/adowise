import { Button } from '@/components/ui/button';
import {
  BarChart2,
  Briefcase,
  Calendar1,
  Dock,
  Gift,
  Heart,
  HelpCircle,
  HomeIcon,
  LogOutIcon,
  Mail,
  Phone,
  PhoneCall,
  Search,
  Settings,
  Star,
  User,
  Wallet2,
  X
} from 'lucide-react';
import React from 'react';
import { BsStars } from "react-icons/bs";
import { TbMessageStar } from "react-icons/tb";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiUserStarLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { authCheck, logout } from '@/redux/features/authThunk';
import { updateUserRole } from '@/redux/features/userThunk';
import { toast } from 'react-toastify';

const sidebarItems = [
  {
    label: "Home",
    icon: <HomeIcon className="!h-5 !w-5" />,
    path: "/expert/dashboard/home",
  },
  {
    label: "Bookings",
    icon: <PhoneCall className="!h-5 !w-5" />,
    path: "/expert/dashboard/bookings/upcoming",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/bookings"),
  },
   {
    label: "Priority Dm",
    icon: <TbMessageStar className="!h-5 !w-5" />,
    path: "/expert/dashboard/priority-dm/pending",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/priority-dm/answered-by-experts"),
  },
  { type: "divider" },
 
  {
    label: "services",
    icon: <Briefcase className="!h-5 !w-5" />,
    path: "/expert/dashboard/services/1-to-1",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/services"),
  },
  {
    label: "Testinomials",
    icon: <Heart className="!h-5 !w-5" />,
    path: "/expert/dashboard/testimonials",
  },

  {
    label: "calendar",
    icon: <Calendar1 className="!h-5 !w-5" />,
    path: "/expert/dashboard/availability/calendar",
    activeCheck: (pathname) =>
      pathname.startsWith("/expert/dashboard/availability"),
  },
  {
    label: "Analytics",
    icon: <BarChart2 className="!h-5 !w-5" />,
    path: "/expert/dashboard/analytics",
  },
  {
    label: "Payments",
    icon: <Wallet2 className="!h-5 !w-5" />,
    path: "/expert/dashboard/payments",
  },
  { type: "divider" },
  {
    label: "Achievements",
    icon: <Gift className="!h-5 !w-5" />,
    path: "/expert/dashboard/rewards",
  },
  {
    label: "Profile",
    icon: <User className="!h-5 !w-5" />,
    path: "/expert/dashboard/profile",
  },
  {
    label: "Settings",
    icon: <Settings className="!h-5 !w-5" />,
    path: "/expert/dashboard/settings",
  },
  {
    label: "Help",
    icon: <HelpCircle className="!h-5 !w-5" />,
    path: "/expert/dashboard/help",
  },
  { type: "divider" },
];

const ExpertSidebar2 = ({isOpen, setIsOpen}) => {
 const user = useSelector((state) => state.auth.user);
  const userRoleChanging = useSelector((state) => state.user.loading);

  console.log({ user: user.id, role: user.role });
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleRoleChange = async () => {
    try {
      await dispatch(
        updateUserRole({ userId: user._id, role: "seeker" })
      ).unwrap();
      await dispatch(authCheck()).unwrap();
      navigate("/seeker/dashboard/home");
    } catch (error) {
      console.log("Role change failed", error);
      toast.error("Role change failed");
    }
  };


  return (
    <aside className=" h-screen w-72 md:w-82 overflow-y-auto bg-white  flex flex-col justify-between z-10">
    <div onClick={() => setIsOpen(!isOpen)} className='flex justify-end mr-3 mt-6 cursor-pointer '><X/></div>
      <div className="flex-1 px-2 mt-6">
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item, index) =>
            item.type === 'divider' ? (
              <div key={index} className="h-[1px] w-full bg-gray-200" />
            ) : (
              <Link onClick={() => setIsOpen(!isOpen)} to={item.path} key={index}>
                <Button
                  size="lg"
                  className={`flex items-center gap-3 transition ease-in duration-200 font-semibold rounded-r-none rounded-l-2xl justify-start w-full
                    ${location.pathname === item.path
                      ? 'bg-muted text-muted-foreground pointer-events-none transition-none'
                      : 'hover:bg-secondary hover:text-foreground'
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
                  {userRoleChanging ? "Switching..." : "Seeker Dashboard"}
                </Button>
      

          <Button
            onClick={handleLogout}
            size="lg"
            className="flex gap-4 mb-9 mt-20 rounded-r-none rounded-l-2xl justify-start w-full"
            variant="secondary"
          >
            <LogOutIcon /> Logout
          </Button>
      </div>

      <div className="p-4 border-t"></div>
    </aside>
  );
};

export default ExpertSidebar2;
