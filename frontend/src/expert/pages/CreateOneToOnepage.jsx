import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { createService } from "@/redux/features/serviceThunk";
import { useNavigate } from "react-router-dom";

const CreateOneToOnePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    amount: "",
    type: "1:1",
    tags: ["1:1"],
  });

  const [loading, setLoading] = useState(false); // ⬅️ Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent multiple submissions

    setLoading(true); // ⬅️ Start loading

    const result = await dispatch(createService(formData));

    setLoading(false); // ⬅️ End loading after response

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
        {/* Title */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="text-lg font-medium">
            Title
          </Label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            id="title"
            placeholder="Enter the name of the service"
            className="h-10"
          />
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="duration" className="text-lg font-medium">
            Duration (mins)
          </Label>
          <Input
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            id="duration"
            type="number"
            placeholder="e.g., 30"
            className="h-10"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="amount" className="text-lg font-medium">
            Amount (₹)
          </Label>
          <Input
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            id="amount"
            type="number"
            placeholder="e.g., 499"
            className="h-10"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-10">
          <Button type="submit" className="h-10" disabled={loading}>
            {loading ? "Creating...." : "Next: Customize"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateOneToOnePage;
