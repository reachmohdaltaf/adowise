import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateWebinarPage = () => {
  const [sessions, setSessions] = useState([{ date: "", time: "" }]);
  const [loading, setLoading] = useState(false); // ⬅️ Add loading state

  const handleSessionChange = (index, field, value) => {
    const updatedSessions = [...sessions];
    updatedSessions[index][field] = value;
    setSessions(updatedSessions);
  };

  const addSession = () => {
    setSessions([...sessions, { date: "", time: "" }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      // fake API call or dispatch can be added here
      // await dispatch(createWebinar(formData)); if you use Redux
      console.log("Submitting webinar...");
      await new Promise((res) => setTimeout(res, 2000)); // Simulating API call
      // Navigate to next page or show success toast
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full mt-10 p-6 space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <Label htmlFor="title" className="text-lg font-medium">
            Title
          </Label>
          <Input
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
            id="duration"
            type="number"
            placeholder="e.g., 30"
            className="h-10"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-lg font-medium">Sessions</Label>
          {sessions.map((session, index) => (
            <div key={index} className="flex gap-4">
              <Input
                type="date"
                value={session.date}
                onChange={(e) =>
                  handleSessionChange(index, "date", e.target.value)
                }
                className="h-10"
              />
              <Input
                type="time"
                value={session.time}
                onChange={(e) =>
                  handleSessionChange(index, "time", e.target.value)
                }
                className="h-10"
              />
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addSession}>
            + Add Session
          </Button>
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
          />
        </div>

        <div className="flex justify-start mt-10">
          <Button type="submit" className="h-10" disabled={loading}>
            {loading ? "Creating..." : "Next: Customize"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateWebinarPage;
