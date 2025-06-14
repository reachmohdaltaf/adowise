import React, { useState, useEffect, useRef } from "react";
import { FaRegBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { Copy, HomeIcon, Check } from "lucide-react";
import { Link } from "react-router-dom";
import ExpertSidebar2 from "./ExpertSidebar2";

const ExpertNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyRef = useRef(null);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCopy = () => {
    const text = copyRef.current?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);

      // Revert after 5 seconds
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

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

  return (
    <nav className="h-12 flex md:border-none px-3 md:px-16 bg-background items-center justify-between">
      <div className="logo">
        <img
          src="/logo.svg"
          className="h-8 hover:scale-100 scale-96 transition cursor-pointer"
          alt="Logo"
        />
      </div>

      <div className="labels flex items-center gap-6">
        <div className="flex gap-4 items-center">
          {/* Copy Link Feature */}
          <div className="flex lg:border  rounded-3xl lg:px-3 items-center">
            <span
              ref={copyRef}
              className="h-8 hidden lg:flex items-center text-sm select-none"
            >
              https://expertify.io/mohd_altaf10
            </span>
            <div>
              {copied ? (
                <Check
                  className="text-primary ml-2 animate-ping-slow"
                  size={18}
                />
              ) : (
                <Copy
                  onClick={handleCopy}
                  className="cursor-pointer ml-2 hover:scale-105 transition-all ease-in-out duration-300"
                  size={18}
                />
              )}
            </div>
          </div>

          {/* Other Icons */}
          <BsStars
            size={25}
            className="cursor-pointer hover:scale-100 scale-96 transition"
          />
          <Link to="/seeker/dashboard/notifications">
            <FaRegBell size={25} className="cursor-pointer" />
          </Link>
          <Link to="/seeker/dashboard/home">
            <HomeIcon size={26} className="cursor-pointer hidden md:block" />
          </Link>
        </div>
        <GiHamburgerMenu
          onClick={handleSidebar}
          size={25}
          className="cursor-pointer menu-btn"
        />
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 border right-0 w-72 h-full z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        transition-transform duration-500 ease-in-out`}
      >
        <div className="sidebar-content">
          <ExpertSidebar2 isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
};

export default ExpertNavbar;
