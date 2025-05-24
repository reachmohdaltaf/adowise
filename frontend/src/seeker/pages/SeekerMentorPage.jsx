import React from "react";
import ExpertShowcase from "./ExpertShowcase";
import CategoryFilter from "../components/CategoryFilter";

const SeekerMentorPage = () => {
  return (
    <div className="relative ">
      {/* Simple Sticky Filter */}
      <div className="sticky top-0 z-10 bg-background shadow-xs md:shadow-none py-3 md:pt-6 md:py-4">
        <CategoryFilter />
      </div>

      {/* Page Content */}
      <div className="mt-5 md:px-2">
        <ExpertShowcase />
      </div>
    </div>
  );
};

export default SeekerMentorPage;
