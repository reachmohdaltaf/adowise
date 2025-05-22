import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const ExpertServiceDetails = () => {
  const { username, id } = useParams();
  const dispatch = useDispatch();
  const { service, loading, error } = useSelector((state) => state.service); // adjust path if nested
  console.log("service details", service);
  useEffect(() => {
    dispatch(fetchServiceById(id));
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message || "Failed to load service"}</div>;
  if(!service) return <div>Service not found</div>
 

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Service Details</h1>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Service ID:</strong> {service._id}</p>
      <p><strong>Title:</strong> {service.title}</p>
      <p><strong>Description:</strong> {service.description}</p>
      <p><strong>Type:</strong> {service.type}</p>
      <p><strong>Amount:</strong> ${service.amount}</p>
      <p><strong>Duration:</strong> {service.duration} minutes</p>
     <Button>{service.type == "1:1"? "Book Now" : "Send Dm"}</Button>
 
    </div>
  );
};

export default ExpertServiceDetails;
