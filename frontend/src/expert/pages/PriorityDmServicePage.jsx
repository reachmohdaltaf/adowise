import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  MyServices } from "@/redux/features/serviceThunk";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PriorityDmServicePage = () => {
  const dispatch = useDispatch();
  const { services, loading } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(MyServices());
  }, [dispatch]);

  const filteredServices = services
    .filter((service) => service.type === "dm")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return <LoadingSpinner />;
  }

  if (filteredServices.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 text-lg">
        No services found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
      {filteredServices.map((service) => (
        <Link
          key={service._id}
          className="md:w-2/3"
          to={`/expert/dashboard/services/update/${service._id}`}
        >
          <ServiceCard service={service} />
        </Link>
      ))}
    </div>
  );
};

export default PriorityDmServicePage;
