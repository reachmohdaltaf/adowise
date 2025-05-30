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
    <nav className="h-12 flex md:border-none px-3 md:px-16 bg-background items-center justify-between">
      <Link to={'/expert/dashboard/home'} className="logo">
        <img
          src={"/logo5.png"}
          className="h-8 hover:scale-100 scale-98 transition cursor-pointer"
          alt="Logo"
        />
    
      </Link>

      <div className="labels flex items-center gap-6">
        <div className="flex gap-4 items-center">
          {/* Copy Link Feature */}
          <div className="flex lg:border  rounded-3xl lg:px-3 items-center">
            <span
              ref={copyRef}
              className="h-8 hidden lg:flex items-center text-sm select-none"
            >
              https://adowise.com/username66
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
                  size={20}
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
        <div
  className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-400 
    ${isOpen ? 'bg-opacity-20 opacity-100 visible pointer-events-auto' 
             : 'bg-opacity-0 opacity-0 invisible pointer-events-none'}`}
  onClick={() => setIsOpen(false)}
></div>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-0 border right-0 w-72 md:w-82 h-full z-50 
        ${isOpen ? "translate-x-0" : "translate-x-full"} 
        transition-transform duration-400 ease-in-out`}
      >
        <div className="sidebar-content">
          <ExpertSidebar2 isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
};

export default ExpertNavbar;
