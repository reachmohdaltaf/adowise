import React, { useState, useEffect } from 'react';
import { FaRegBell } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsStars } from 'react-icons/bs';
import { HomeIcon, SearchIcon } from 'lucide-react';
import SeekerSidebar from './SeekerSidebar';
import SeekerSidebar2 from './SeekerSidebar2';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const SeekerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle opening and closing of the sidebar
  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.sidebar') || event.target.closest('.menu-btn')) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  

  return (
    <nav className='h-12 flex md:border-none    px-3 md:px-16 bg-background  items-center justify-between'>
      <Link to={'/seeker/dashboard/home'} className="logo flex items-center gap-1">
        <img src="/logo.svg" className='h-8 scale-98 hover:scale-100  transition cursor-pointer' alt="" />
      </Link>

      <div className="labels flex items-center gap-6">
        <div className='flex gap-4 items-center'>
         <div className="search  hidden md:flex items-center border rounded-3xl px-4">
         <Input
  placeholder="Search"
  className="w-40 border-none ring-0  outline-none placeholder:text-foreground
             focus:w-60 transition-all duration-500 ease-in-out"
/>
         <SearchIcon size={20} className='cursor-pointer hover:scale-100 scale-96 transition' />
         </div>
         <SearchIcon size={25} className='cursor-pointer md:hidden hover:scale-100 scale-96 transition' />
          <BsStars size={25} className='cursor-pointer hover:scale-100 scale-96 transition' />
          <Link to='/seeker/dashboard/notifications'>   <FaRegBell size={25} className='cursor-pointer' /></Link>
         <Link to='/seeker/dashboard/home'><HomeIcon size={26} className='cursor-pointer hidden md:block'/></Link> 
        </div>
        <GiHamburgerMenu
          onClick={handleSidebar}
          size={25}
          className='cursor-pointer   menu-btn'
        />
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0  border right-0 w-72 h-full  z-50 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
          transition-transform duration-500 ease-in-out`}>
        <div className="sidebar-content ">
        <SeekerSidebar2 isOpen={isOpen} setIsOpen={setIsOpen} />
        
        </div>
      </div>
    </nav>
  );
};

export default SeekerNavbar;
