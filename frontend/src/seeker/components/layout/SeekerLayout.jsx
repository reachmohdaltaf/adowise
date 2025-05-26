import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import SeekerNavbar from "./SeekerNavbar";
import SeekerSidebar from "./SeekerSidebar";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import useInfiniteScroll from "@/hooks/useInfiniteScroll"; // 👈 Your custom hook

const SeekerLayout = () => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const { loading, page, totalPages } = useSelector((state) => state.service);
    const { user } = useSelector((state) => state.auth); // Add this line
  useEffect(() => {
    dispatch(fetchAllServices({ page: 1, limit: 10 }));
  },[dispatch, user?.role]);

  useInfiniteScroll(
    containerRef,
    () => {
      if (!loading && page < totalPages) {
        dispatch(fetchAllServices({ page: page + 1, limit: 10 }));
      }
    },
    [loading, page, totalPages]
  );

  return (
    <div className="max-w-screen-2xl mx-auto md:px-10 relative">
      <div className="fixed top-0 left-0 right-0 z-30 ">
        <div className="max-w-screen-2xl bg-background mx-auto">
          <SeekerNavbar />
        </div>
      </div>

      <div className="pt-12">
        <div className="lg:flex hidden">
          <div className="fixed ">
            <SeekerSidebar />
          </div>
        </div>

        <div
          ref={containerRef}
          id="seeker-scroll"
          className="flex-1 h-screen hidescroll md:px-10 px-0 py-2 md:py-1 lg:ml-68 overflow-y-auto"
        >
          <div className="mb-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeekerLayout;
