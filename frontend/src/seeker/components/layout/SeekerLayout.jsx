import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import SeekerNavbar from "./SeekerNavbar";
import SeekerSidebar from "./SeekerSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import useInfiniteScroll from "@/hooks/useInfiniteScroll"; // 👈 Your custom hook
import SeekerMobileFooter from "./SeekerMobileFooter";

const SeekerLayout = () => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const lastScrollTop = useRef(0); // for detecting scroll direction
  const [showFooter, setShowFooter] = useState(true); // for showing/hiding footer

  const { loading, page, totalPages } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllServices({ page: 1, limit: 10 }));
  }, [dispatch, user?.role]);

  useInfiniteScroll(
    containerRef,
    () => {
      if (!loading && page < totalPages) {
        dispatch(fetchAllServices({ page: page + 1, limit: 10 }));
      }
    },
    [loading, page, totalPages]
  );

  // Scroll detection logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = containerRef.current?.scrollTop || 0;

      if (scrollTop > lastScrollTop.current) {
        // Scrolling down
        setShowFooter(false);
      } else {
        // Scrolling up
        setShowFooter(true);
      }

      lastScrollTop.current = scrollTop;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="max-w-screen-2xl mx-auto md:px-10 relative">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30 ">
        <div className="max-w-screen-2xl bg-background mx-auto">
          <SeekerNavbar />
        </div>
      </div>

      <div className="pt-12">
        {/* Sidebar for large screens */}
        <div className="lg:flex hidden">
          <div className="fixed ">
            <SeekerSidebar />
          </div>
        </div>

        {/* Main Content Scrollable */}
        <div
          ref={containerRef}
          id="seeker-scroll"
          className="flex-1 h-screen hidescroll md:px-10 px-2 py-2 md:py-1 lg:ml-68 overflow-y-auto"
        >
          <div className="mb-20">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Sliding Mobile Footer */}
      <div
        className={`md:hidden fixed bottom-0 w-full transition-transform duration-500 ${
          showFooter ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <SeekerMobileFooter />
      </div>
    </div>
  );
};

export default SeekerLayout;
