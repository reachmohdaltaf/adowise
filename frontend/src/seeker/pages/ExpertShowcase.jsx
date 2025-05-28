import React, { useEffect }  from "react";
import ExpertShowcaseCard from "../components/ExpertShowcaseCard";
import {  useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import { resetServices } from "@/redux/features/serviceSlice";
import CardSkeleton from "@/components/common/CardSkeleton";

const ExpertShowcase = () => {
  const dispatch = useDispatch();
  const { services, loading, page, totalPages } = useSelector(
    (state) => state.service
  );

  console.log("ExpertShowcase services:", services);
   useEffect(() => {
    // Reset and fetch fresh services when this component mounts
    dispatch(fetchAllServices({ page: 1, limit: 10 }));
    dispatch(resetServices())
  }, [dispatch]);
  

 if (!loading && services.length === 0) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {Array(6).fill(0).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}


  return (
    <div className="grid   px-0 md:px-4 pt-3 md:py-2 md:rounded-md rounded-none grid-cols-1 md:grid-cols-2 gap-2 md:gap-2">
     {services.map((service) => {
  const expert = service.expertId;
  return (
    <Link
      to={`/${expert?.username}/service/${service._id}`}
      key={service._id}
    >
      <ExpertShowcaseCard
        tags={service.tags}
        type={service.type}
        username={expert?.username}
        id={service._id}
        title={service.title}
        price={service.amount}
        rating={3.5}
        description={service.description}
        image={expert?.image || "https://placehold.co/600x400"}
        author={expert?.name || "Unknown"}
      />
    </Link>
  );
})}

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
