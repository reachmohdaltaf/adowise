import React, { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="h-14 px-2 md:px-6 flex justify-between items-center w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20">
        <Link to="/" className="logo">
          <img src="/logo-g-4.png" className="h-8" alt="Logo" />
        </Link>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden p-2 rounded-md "
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8 " />
        </button>

        {/* Nav buttons for medium and up */}
        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-2">
            <Button variant="ghost" className="cursor-pointer px-3 font-normal">
              Explore
            </Button>
            <Button variant="ghost" className="cursor-pointer px-3 font-normal">
              Expert
            </Button>
            <Button variant="ghost" className="cursor-pointer px-3 font-normal">
              Send DM
            </Button>
          </ul>

          <div className="flex gap-2 items-center">
            <Link to="/login">
              <Button variant="outline" className="bg-transparent shadow-none">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button variant="colored">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform duration-400 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Link to="/" onClick={() => setSidebarOpen(false)}>
            <img src="/logo-g-4.png" className="h-8" alt="Logo" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-md  "
          >
            <X className="w-6 h-6 " />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4">
          <Button
            variant="ghost"
            className="text-left py-6"
            onClick={() => setSidebarOpen(false)}
          >
            Explore
          </Button>
          <Button
            variant="ghost"
            className="text-left py-6 "
            onClick={() => setSidebarOpen(false)}
          >
            Become Expert
          </Button>
          <Button
            variant="ghost"
            className="text-left py-6 "
            onClick={() => setSidebarOpen(false)}
          >
            Send DM
          </Button>

          <Link to="/login" onClick={() => setSidebarOpen(false)}>
            <Button variant="outline" className="w-full py-6">
              Login
            </Button>
          </Link>

          <Link to="/register" onClick={() => setSidebarOpen(false)}>
            <Button variant={"colored"} className="w-full py-6">Sign Up</Button>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Navbar;
