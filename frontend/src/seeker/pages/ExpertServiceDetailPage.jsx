import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card"; // Make sure this path matches your setup

const ExpertServiceDetails = () => {
  const { username, id } = useParams();
  const dispatch = useDispatch();
  const { service, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServiceById(id));
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message || "Failed to load service"}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="p-6  bg-primary min-h-screen flex items-start justify-center">
      <Card className="w-full max-w-md text-start">
        <CardContent className="space-y-2 p-6">
          <h1 className="text-2xl font-bold">Service Details</h1>
          <p><strong>Username:</strong> {username}</p>
          <p><strong>Service ID:</strong> {service._id}</p>
          <p><strong>Title:</strong> {service.title}</p>
          <p><strong>Description:</strong> {service.description}</p>
          <p><strong>Type:</strong> {service.type}</p>
          <p><strong>Amount:</strong> ${service.amount}</p>
          <p><strong>Duration:</strong> {service.duration} minutes</p>
          <Button>
            {service.type === "1:1" ? "Book Now" : "Send DM"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertServiceDetails;
