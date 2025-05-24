import React, { useEffect, useRef, useState } from "react";
import ExpertShowcase from "./ExpertShowcase";
import CategoryFilter from "../components/CategoryFilter";

const SeekerMentorPage = () => {
  
  const sentinelRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      {/* Sentinel div placed just before sticky element */}
      <div ref={sentinelRef} className="h-1"></div>

      {/* Sticky Filter */}
      <div
        className={`sticky top-[-9px] md:top-[-1px] z-10 transition-all duration-300 py-3  md:py-4 bg-background ${
          isSticky ? "shadow-sm bg-background scale-[1.02]" : ""
        }`}
      >
        <CategoryFilter />
      </div>

      {/* Page Content */}
      <div className="mt-5">
        <ExpertShowcase />
      </div>
    </div>
  );
};

export default SeekerMentorPage;
