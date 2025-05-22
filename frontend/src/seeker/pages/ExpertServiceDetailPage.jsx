// pages/ExpertServiceDetails.jsx
import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

const ExpertServiceDetails = () => {
  const { username, id } = useParams();

  useEffect(() => {
    console.log("Username:", username);
    console.log("Service ID:", id);

    // Fetch service details here if needed
  }, [username, id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Service Details</h1>
      <p>Username: {username}</p>
      <p>Service ID: {id}</p>
    </div>
  );
};

export default ExpertServiceDetails;
