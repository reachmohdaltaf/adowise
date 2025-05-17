// ✅ Importing required components and functions
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { deleteServiceById, fetchServiceById, updateService } from "@/redux/features/serviceThunk";
import { SaveIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const UpdateServicePage = () => {
  const { serviceId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize navigate

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    amount: "",
    generateWithAI: false,
    allowCustomPayment: false,
    hideService: false,
    slashPricing: false,
    sellRecording: false,
    recordingPrice: "",
    type: "",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");

  // 📦 Fetch service data by ID
  useEffect(() => {
    if (serviceId) {
      dispatch(fetchServiceById(serviceId)).then((res) => {
        const service = res.payload;
        setFormData({
          title: service.title || "",
          description: service.description || "",
          duration: service.duration || "",
          amount: service.amount || "",
          generateWithAI: service.generateWithAI || false,
          allowCustomPayment: service.allowCustomPayment || false,
          hideService: service.hideService || false,
          slashPricing: service.slashPricing || false,
          sellRecording: service.sellRecording || false,
          recordingPrice: service.recordingPrice || "",
          type: service.type || "",
          tags: service.tags || [],
        });
      });
    }
  }, [serviceId, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting with serviceId:", serviceId, "formData:", formData); // Log the values being sent
    dispatch(updateService({ serviceId, formData }))
      .then(() => {
        // Navigate to '/services' after successful service update
       if(formData.type === "1:1"){
        navigate("/expert/dashboard/services/1-to-1");
       }
       else if(formData.type === "dm"){
        navigate("/expert/dashboard/services/dm");
       }else(
        navigate("/expert/dashboard/services/webinar")
       )
      })
      .catch((error) => {
        console.error("Error updating service:", error);
      });
  };

  const handleDelete = () => {
    dispatch(deleteServiceById(serviceId))
    .then(() => {
        if(formData.type === "1:1"){
            navigate("/expert/dashboard/services/1-to-1");
           }
           else if(formData.type === "dm"){
            navigate("/expert/dashboard/services/dm");
           }else(
            navigate("/expert/dashboard/services/webinar")
           )
          })
          .catch((error) => {
            console.error("Error deleting service:", error);
          });
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      const newTag = tagInput.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData({ ...formData, tags: [...formData.tags, newTag] });
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setFormData({
      ...formData, 
      tags: formData.tags.filter((_, index) => index !== indexToRemove)
    });
  };

  const handleTagInputKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",")) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Card className="px-2 border-none ">
      <form action="" onSubmit={handleSubmit} className="flex gap-6 flex-col">
        {/* 🔤 Service Title Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="title" className="text-lg font-medium">
            Title
          </Label>
          <Input
            id="title"
            placeholder="Enter the name of the service"
            className="h-12 border border-gray-200"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        {/* 📝 Service Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="description" className="text-lg font-medium">
            Long Description
          </Label>
          <Textarea
            id="description"
            placeholder="Enter the description of the service"
            className="h-62 border border-gray-200"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* 🏷️ Tags Section */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="tags" className="text-lg font-medium">
            Tags
          </Label>
          
          {/* Display Added Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.tags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(index)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* Tag Input with Add Button */}
          <div className="flex gap-2">
            <Input
              id="tags"
              placeholder="Press Enter or comma to add tag"
              className="h-12 border border-gray-200"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
            />
            <Button 
              type="button" 
              onClick={handleAddTag}
              className="h-12"
            >
              Add
            </Button>
          </div>
        </div>

        {/* 🤖 AI Generation Toggle */}
        <div className="flex items-center justify-start gap-3">
          <Label className="text-lg font-medium">Generate with AI</Label>
          <Switch
            checked={formData.generateWithAI}
            onCheckedChange={(val) =>
              setFormData({ ...formData, generateWithAI: val })
            }
            className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
          />
        </div>

        {/* ⏱️ Duration Input */}
        {formData.type === "1:1" && <div className="flex flex-col gap-2">
          <Label htmlFor="duration" className="text-lg font-medium">
            Duration (mins)
          </Label>
          <Input
            id="duration"
            type="number"
            placeholder="Enter Duration"
            className="h-10 border border-gray-200"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
          />
        </div>}

        {/* 💰 Pricing Section */}
        <h3 className="text-3xl font-bold">Pricing</h3>

        {/* 💵 Amount Input */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="amount" className="text-lg font-medium">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount"
            className="h-10 border border-gray-200"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />

          {/* 🔄 Custom Payment Toggle */}
          <div className="flex items-center justify-start gap-3">
            <Label className="text-sm font-medium">
              Allow customers to pay what they want
            </Label>
            <Switch
              checked={formData.allowCustomPayment}
              onCheckedChange={(val) =>
                setFormData({ ...formData, allowCustomPayment: val })
              }
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
            />
          </div>
        </div>

        {/* ⚙️ Configuration */}
        <div className="flex flex-col gap-6 py-10">
          <h3 className="text-3xl font-bold">Configuration</h3>

          {/* 🙈 Hide Service Toggle */}
          <div className="flex mt-4 items-center justify-start gap-3">
            <Label className="text-sm font-medium">
              Hide this service on your profile
            </Label>
            <Switch
              checked={formData.hideService}
              onCheckedChange={(val) =>
                setFormData({ ...formData, hideService: val })
              }
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
            />
          </div>

          {/* 💡 Slash Pricing Toggle */}
          <div className="flex items-center justify-start gap-3">
            <Label className="text-sm font-medium">
              Increase conversion by slash pricing
            </Label>
            <Switch
              checked={formData.slashPricing}
              onCheckedChange={(val) =>
                setFormData({ ...formData, slashPricing: val })
              }
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
            />
          </div>

          {/* 🎥 Sell Recording Toggle + Pricing */}
          <div className="flex flex-col justify-start gap-6">
            <div className="flex items-center justify-start gap-3">
              <Label className="text-sm font-medium">
                Sell session recording
              </Label>
              <Switch
                checked={formData.sellRecording}
                onCheckedChange={(val) =>
                  setFormData({ ...formData, sellRecording: val })
                }
                className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Recording pricing</Label>
              <Input
                type="number"
                placeholder="Enter amount"
                className="h-10 border border-gray-200"
                value={formData.recordingPrice}
                onChange={(e) =>
                  setFormData({ ...formData, recordingPrice: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* ✅ Update Button */}
        <Button type="submit" className="w-44"><SaveIcon/> Save Changes</Button>
      </form>

      {/* ❌ Delete Service Button */}
      <div className="mt-4">
        <Button onClick={handleDelete} className="bg-red-400 w-44 hover:bg-red-500/90">
          Delete Service
        </Button>
      </div>
    </Card>
  );
};

export default UpdateServicePage;