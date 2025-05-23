import React, { useEffect } from "react";
import ExpertShowcaseCard from "../components/ExpertShowcaseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Link } from "react-router-dom";

const ExpertShowcase = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.service);

useEffect(() => {
  console.log("useEffect called");
  dispatch(fetchAllServices());
}, [dispatch]);



  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
};

export default ExpertShowcase;
