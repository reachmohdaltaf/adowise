import React from "react";
import ExpertShowcaseCard from "../components/ExpertShowcaseCard";
import {experts} from "../../json/CardData";

  
  

const ExpertShowcase = () => {
  return (
    <div  className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {experts.map((expert) => (
        <ExpertShowcaseCard
        key={expert.id}
        id={expert.id} // ✅ Pass ID
        title={expert.title}
        price={expert.price}
        rating={expert.rating}
        description={expert.description}
        image={expert.image}
        author={expert.author}
      />
      ))}
    </div>
  );
};

export default ExpertShowcase;
