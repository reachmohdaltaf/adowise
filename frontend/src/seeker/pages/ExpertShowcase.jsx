import React, { useEffect, useCallback } from "react";
import ExpertShowcaseCard from "../components/ExpertShowcaseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Link } from "react-router-dom";

const ExpertShowcase = () => {
  const dispatch = useDispatch();
  const { services, loading, page, totalPages } = useSelector(
    (state) => state.service
  );

  // Initial fetch on component mount
  useEffect(() => {
    if (services.length === 0) {
      dispatch(fetchAllServices({ page: 1, limit: 6 }));
    }
  }, [dispatch, services.length]);

  // Load more services when near bottom
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && // near bottom
      !loading &&
      page < totalPages
    ) {
      dispatch(fetchAllServices({ page: page + 1, limit: 6 }));
    }
  }, [dispatch, loading, page, totalPages]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (loading && services.length === 0) {
    // Show spinner only when initial load
    return <div><p>Loading...</p></div>
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
        <div className="text-center mt-4">
          <p>Loading more services...</p>
        </div>
      )}
      {page >= totalPages && !loading && (
        <p className="text-center mt-4">No more services to load.</p>
      )}
    </div>
  );
};

export default ExpertShowcase;
