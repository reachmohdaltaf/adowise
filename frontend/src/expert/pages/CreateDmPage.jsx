import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { createService } from "@/redux/features/serviceThunk";
import { useNavigate } from "react-router-dom";

const CreateDmPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    expertId: "6819149151e44834f378c3c8",
    title: "",
    amount: "",
    type: "dm",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(createService(formData));

    if (createService.fulfilled.match(result)) {
      const createdServiceId = result.payload._id;
      navigate(`/expert/dashboard/services/update/${createdServiceId}`);
    } else {
      console.error("Service creation failed:", result);
      // Optional: show error toast/snackbar
    }
  };

  return (
    <Card className="w-full mt-10 p-6 space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="text-lg font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter the name of the service"
            className="h-10"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="amount" className="text-lg font-medium">
            Amount (₹)
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="e.g., 499"
            className="h-10"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        <div className="flex justify-start mt-10">
          <Button type="submit" className="h-10">
            Next: Customize
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateDmPage;
