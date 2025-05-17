import { Card } from "@/components/ui/card";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ServiceCard from "../components/ServiceCard";
import { Link } from "react-router-dom";

const PriorityDmServicePage = () => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);

  // Fetching services using dispatch
  useEffect(() => {
    dispatch(fetchAllServices()).then((response) => {
      // Filter out services with type "dm"
      const filteredServices = response.payload.slice().
      filter((service) => service.type === "dm")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setServices(filteredServices); // Set the filtered services
    });
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4">
    
        {services.map((service) => (
            <Link
            className="md:w-2/3"
            to={`/expert/dashboard/services/update/${service._id}`}
          >
          <ServiceCard key={service._id} service={service} />
          </Link>
        ))}
    </div>
  );
};

export default PriorityDmServicePage;
