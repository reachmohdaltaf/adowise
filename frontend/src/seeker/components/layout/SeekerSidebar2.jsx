import { Button } from '@/components/ui/button';
import {
  Calendar1,
  Dock,
  Gift,
  HelpCircle,
  HomeIcon,
  LogOutIcon,
  Mail,
  Phone,
  Search,
  Settings,
  Star,
  User,
  X
} from 'lucide-react';
import React from 'react';
import { BsStars } from "react-icons/bs";
import { TbMessageStar } from "react-icons/tb";
import { Link, useLocation } from 'react-router-dom';
import { RiUserStarLine } from 'react-icons/ri';


const sidebarItems = [
  { label: 'Home', icon: <HomeIcon className="!h-5 !w-5" />, path: '/seeker/dashboard/home' },
  { label: 'Messages', icon: <Mail className="!h-5 !w-5" />, path: '/seeker/dashboard/messages' },
  { label: 'Bookings', icon: <Phone className="!h-5 !w-5" />, path: '/seeker/dashboard/bookings/upcoming' },
  { type: 'divider' },
  { label: 'Find People', icon: <Search className="!h-5 !w-5" />, path: '/seeker/dashboard/find-people' },
  { label: 'Listing', icon: <Dock className="!h-5 !w-5" />, path: '/seeker/dashboard/listing' },
  { label: 'Calender', icon: <Calendar1 className="!h-5 !w-5" />, path: '/seeker/dashboard/calendar' },
  { label: 'Ai Search', icon: <BsStars className="!h-5 !w-5" />, path: '/seeker/dashboard/aisearch' },
 {
    label: 'priority-dm',
    icon: <TbMessageStar  className="!h-5 !w-5" />,
    path: '/seeker/dashboard/priority-dm/sent-messages',
    activeCheck: (pathname) => pathname.startsWith('/seeker/dashboard/priority-dm/answered-by-experts')
  },  { type: 'divider' },
  { label: 'Rewards', icon: <Gift className="!h-5 !w-5" />, path: '/seeker/dashboard/rewards' },
  { label: 'Profile', icon: <User className="!h-5 !w-5" />, path: '/seeker/dashboard/profile' },
  { label: 'Settings', icon: <Settings className="!h-5 !w-5" />, path: '/seeker/dashboard/settings' },
  { label: 'Help', icon: <HelpCircle className="!h-5 !w-5" />, path: '/seeker/dashboard/help' },
];

const SeekerSidebar2 = ({isOpen, setIsOpen}) => {
  const location = useLocation();

  return (
    <aside className=" h-screen  w-72 overflow-y-auto bg-background  flex flex-col justify-between z-10">
    <div onClick={() => setIsOpen(!isOpen)} className='flex justify-end mr-3 mt-6 cursor-pointer '><X/></div>
      <div className="flex-1 px-2 mt-6">
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item, index) =>
            item.type === 'divider' ? (
              <div key={index} className="h-[1px] w-full " />
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
         <Link to="/logout">
                  <Button
                    size="lg"
                    className="mt-3 rounded-full font-semibold py-5  w-full"
                    variant=""
                  >
                <RiUserStarLine className='!h-5 !w-5' />
                         Expert Dashboard
                        </Button>
                </Link>

        <Link to="/logout">
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

export default SeekerSidebar2;
