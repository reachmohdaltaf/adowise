import React from "react";
import { useParams } from "react-router-dom";
import { experts } from "../../json/CardData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ExpertPage = () => {
  const { id } = useParams();
  const expert = experts.find((exp) => exp.id === id);

  if (!expert) {
    return <p className="text-center text-red-500">Mentor not found!</p>;
  }

  return (
    <div className="flex justify-center py-2 px-1">
      <Card className="max-w-xl w-full p-0">
        <CardContent className={'px-2'}>
          <h1 className="text-2xl md:text-3xl font-bold mb-4">{expert.title}</h1>
          <img
            src={expert.image}
            alt={expert.title}
            className="w-40 h-40 object-cover rounded-md mb-4"
          />
          <p className="text-muted-foreground mb-3">{expert.description}</p>
          <p className="text-sm font-medium mb-1">Expertise Fee: ₹{expert.price}</p>
          <p className="text-sm font-medium mb-1">Mentor Rating: {expert.rating}⭐</p>
          <p className="text-sm font-medium mb-3">Mentor Name: {expert.author}</p>
          <p className="text-sm text-gray-500 mb-6">
            Ready to guide you through your journey with proven strategies and industry insights.
          </p>
          <Button className="mb-4 w-full">Send DM</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpertPage;
