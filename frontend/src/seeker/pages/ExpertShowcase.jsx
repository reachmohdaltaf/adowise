import React, { useEffect } from "react";
import ExpertShowcaseCard from "../components/ExpertShowcaseCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllServices } from "@/redux/features/serviceThunk";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Link } from "react-router-dom";

  
  

const ExpertShowcase = () => {

  const dispatch = useDispatch();
  const {services} = useSelector((state) => state.service);
  console.log("services in showcase", services);
  useEffect(() => {
  dispatch(fetchAllServices());
}, []);

if(!services){
  return <LoadingSpinner/>
}

  return (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {services.map((service) => (
    <Link
      to={`/${service.expertId?.username}/service/${service._id}`}
      key={service._id}
    >
      <ExpertShowcaseCard
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
