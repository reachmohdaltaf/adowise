import React from "react";
import ExpertShowcaseCard from "../components/ExpertShowcaseCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const ExpertShowcase = () => {
  const { services, loading, page, totalPages } = useSelector(
    (state) => state.service
  );
  console.log(
    "Services IDs:",
    services.map((s) => s._id)
  );

  if (loading && services.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {services.map((service) => (
        <Link
          to={`/${service.expertId?.username}/service/${service._id}`}
          key={service._id}
        >
          <ExpertShowcaseCard
            tags={service.tags}
            type={service.type}
            username={service.expertId?.username}
            id={service._id}
            title={service.title}
            price={service.amount}
            rating={5}
            description={service.description}
            image={service.expertId?.image || "https://placehold.co/600x400"}
            author={service.expertId?.name || "Unknown"}
          />
        </Link>
      ))}
      {loading && services.length > 0 && (
        <div className="flex justify-center items-center mt-4">
          <div className="loader"></div>
        </div>
      )}

      {page >= totalPages && !loading && (
        <p className="text-center mt-4">No more services to load.</p>
      )}
    </div>
  );
};

export default ExpertShowcase;
