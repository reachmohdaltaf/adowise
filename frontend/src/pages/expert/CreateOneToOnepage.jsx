import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { createService } from "@/redux/features/serviceThunk";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
    <Card className="w-full mt-10 px-3 space-y-6">
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
            className="h-10 border-1 border-gray-200 shadow-none"
          />
        </div>

        {/* Duration */}
      {/* Duration */}
<div className="flex flex-col gap-1">
  <Label htmlFor="duration" className="text-lg font-medium">
    Duration (mins)
  </Label>
  <Select
    value={formData.duration}
    onValueChange={(value) =>
      setFormData({ ...formData, duration: value })
    }
  >
    <SelectTrigger id="duration" className="w-full ring-0 focus:ring-0">
      <SelectValue placeholder="Select duration" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="15">15</SelectItem>
      <SelectItem value="30">30</SelectItem>
      <SelectItem value="45">45</SelectItem>
      <SelectItem value="60">60</SelectItem>
    </SelectContent>
  </Select>
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
            className="h-10 border-1 border-gray-200 shadow-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-start mt-10">
          <Button size={''} type="submit" className="h-10 text-sm" disabled={loading}>
            {loading ? "Creating...." : "Next: Customize"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateOneToOnePage;
