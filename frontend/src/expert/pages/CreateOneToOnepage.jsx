import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { createService } from "@/redux/features/serviceThunk";
import { Link, useNavigate } from "react-router-dom";

const CreateOneToOnePage = () => {

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    amount: "",
    type: "1:1",
    tags: ["1:1"],
  })

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createService(formData));
  
    // Check if service was successfully created
    if (createService.fulfilled.match(result)) {
      const createdServiceId = result.payload._id; // or `id`, depending on your API
      navigate(`/expert/dashboard/services/update/${createdServiceId}`);
    } else {
      console.error("Service creation failed:", result);
      // Show error toast/snackbar here if needed
    }
  };
  
  


  return (
    <Card className="w-full   mt-10 p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="text-lg font-medium">
            Title
          </Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            id="title"
            placeholder="Enter the name of the service"
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="duration" className="text-lg font-medium">
            Duration (mins)
          </Label>
          <Input
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            id="duration"
            type="number"
            placeholder="e.g., 30"
            className="h-10"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="amount" className="text-lg font-medium">
            Amount (₹)
          </Label>
          <Input
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            id="amount"
            type="number"
            placeholder="e.g., 499"
            className="h-10"
          />
        </div>

        <div className="flex justify-start mt-10">
          <Button type="submit" className="h-10 ">
            Next: Customize
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateOneToOnePage;
