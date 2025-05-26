import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { HomeIcon, SearchIcon } from "lucide-react";
import SeekerSidebar2 from "./SeekerSidebar2";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";

const SeekerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar
  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".sidebar") ||
        event.target.closest(".menu-btn")
      ) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="h-14 flex md:border-none border py-6 px-4 md:px-16 bg-background items-center justify-between">
      <Link
        to={"/seeker/dashboard/home"}
        className="logo flex items-center gap-1"
      >
        <img
          src="/logo.png"
          className="h-8 scale-98 hover:scale-100 transition cursor-pointer"
          alt="logo"
        />
      </Link>

      <div className="labels flex items-center gap-2 md:gap-6">
        <div className="flex gap-4 items-center">
          <div className="search hidden md:flex items-center border rounded-3xl px-4">
            <Input
              placeholder="Search"
              className="w-40 border-none ring-0 outline-none placeholder:text-foreground
              focus:w-60 transition-all duration-500 ease-in-out"
            />
            <SearchIcon
              size={22}
              className="cursor-pointer hover:scale-100 scale-96 transition"
            />
          </div>
          <SearchIcon
            size={22}
            className="cursor-pointer md:hidden hover:scale-100 scale-96 transition"
          />
          <BsStars
            size={22}
            className="cursor-pointer hover:scale-100 scale-96 transition"
          />
          <Link to="/seeker/dashboard/notifications">
            <FaRegBell size={22} className="cursor-pointer" />
          </Link>
          <Link to="/seeker/dashboard/home">
            <HomeIcon size={22} className="cursor-pointer hidden md:block" />
          </Link>
        </div>
        <GiHamburgerMenu
          onClick={handleSidebar}
          size={24}
          className="cursor-pointer menu-btn"
        />
      </div>

    <div
  className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-400 
    ${isOpen ? 'bg-opacity-20 opacity-100 visible pointer-events-auto' 
             : 'bg-opacity-0 opacity-0 invisible pointer-events-none'}`}
  onClick={() => setIsOpen(false)}
/>


      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 border right-0 w-72 md:w-82 h-full z-50 
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          transition-transform duration-400 ease-in-out bg-white`}
      >
        <div className="sidebar-content">
          <SeekerSidebar2 isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
};

export default SeekerNavbar;
