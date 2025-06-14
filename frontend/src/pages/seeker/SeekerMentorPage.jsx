import React from "react";
import ExpertShowcase from "./ExpertShowcase";
import CategoryFilter from "../../components/seeker/CategoryFilter";

const SeekerMentorPage = () => {
  return (
    <div className="relative ">
      {/* Simple Sticky Filter */}
      <div className="sticky top-14 z-10 bg-background shadow-none md:shadow-none  py-3 md:pt-6 md:py-4">
        <CategoryFilter />
      </div>

      {/* Page Content */}
      <div className=" px-0">
        <ExpertShowcase />
      </div>
    </div>
  );
};

export default SeekerMentorPage;
