"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Save, SaveAllIcon, SaveIcon, X } from "lucide-react";
import React, { useState } from "react";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const getInitialSchedule = () =>
  daysOfWeek.reduce((acc, day) => {
    acc[day] = {
      isChecked: false,
      times: [{ from: "", to: "" }],
    };
    return acc;
  }, {});

const ExpertSchedulePage = () => {
  const [schedules, setSchedules] = useState({
    Default: getInitialSchedule(),
  });

  const [activeSchedule, setActiveSchedule] = useState("Default");
  const [newScheduleName, setNewScheduleName] = useState("");
  const [blockedDates, setBlockedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const schedule = schedules[activeSchedule];

  const handleCheckboxChange = (day, checked) => {
    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        [day]: {
          isChecked: checked,
          times: checked ? prev[activeSchedule][day].times : [{ from: "", to: "" }],
        },
      },
    }));
  };

  const handleTimeChange = (day, index, key, value) => {
    const updatedTimes = [...schedule[day].times];
    updatedTimes[index][key] = value;

    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        [day]: {
          ...prev[activeSchedule][day],
          times: updatedTimes,
        },
      },
    }));
  };

  const addTimeSlot = (day) => {
    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        [day]: {
          ...prev[activeSchedule][day],
          times: [...prev[activeSchedule][day].times, { from: "", to: "" }],
        },
      },
    }));
  };

  const removeTimeSlot = (day, index) => {
    const updatedTimes = schedule[day].times.filter((_, i) => i !== index);

    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        [day]: {
          ...prev[activeSchedule][day],
          times: updatedTimes,
        },
      },
    }));
  };

  const handleAddSchedule = () => {
    if (!newScheduleName.trim()) return;
    setSchedules((prev) => ({
      ...prev,
      [newScheduleName]: getInitialSchedule(),
    }));
    setActiveSchedule(newScheduleName);
    setNewScheduleName("");
  };

  const handleDateSelect = (date) => {
    const dateStr = date.toDateString();
    if (!blockedDates.includes(dateStr)) {
      setBlockedDates((prev) => [...prev, dateStr]);
    }
  };

  return (
    <div>
      {/* Navbar with buttons */}
      <nav className="flex items-center bg-background  sticky top-0 gap-2 mb-4  w-full overflow-x-auto px-2">
        {Object.keys(schedules).map((name) => (
          <Button
            key={name}
            variant={activeSchedule === name ? "default" : "outline"}
            className="rounded-md h-8"
            onClick={() => setActiveSchedule(name)}
          >
            {name}
          </Button>
        ))}

        {/* Add Schedule Button */}
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" className="rounded-md h-8">
              +
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-4">
              <h3 className="font-medium">Add New Schedule</h3>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-normal text-destructive">
                  Schedule Name
                </label>
                <input
                  type="text"
                  placeholder="Enter schedule name"
                  value={newScheduleName}
                  onChange={(e) => setNewScheduleName(e.target.value)}
                  className="border h-10 border-gray-300 rounded-md px-2 py-1"
                />
              </div>
              <Button onClick={handleAddSchedule}>Save</Button>
            </div>
          </DialogContent>
        </Dialog>
      </nav>

      {/* Main Content */}
      <div className="md:flex w-full gap-2 items-start px-2">
        {/* Left: Weekly schedule */}
        <Card className="w-full">
          <CardHeader className="flex px-2 flex-row items-center justify-between">
            <CardTitle className="px-2 font-normal">{activeSchedule}</CardTitle>
            <Button size="sm"><Save/> Save changes</Button>
          </CardHeader>

          <CardContent className="px-2 space-y-4">
            {daysOfWeek.map((day) => (
              <div
                key={day}
                className="flex items-start justify-between w-full gap-4"
              >
                <div className="flex items-center gap-2 min-w-[120px]">
                  <Checkbox
                    className="bg-gray-200"
                    id={day}
                    checked={schedule[day].isChecked}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(day, checked)
                    }
                  />
                  <label
                    htmlFor={day}
                    className="text-sm font-normal text-muted-foreground"
                  >
                    {day}
                  </label>
                </div>

                <div className="flex flex-col gap-2">
                  {schedule[day].isChecked ? (
                    <>
                      {schedule[day].times.map((time, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="time"
                            value={time.from}
                            onChange={(e) =>
                              handleTimeChange(day, index, "from", e.target.value)
                            }
                            className="border rounded px-2 py-1 text-sm"
                          />
                          <span>-</span>
                          <input
                            type="time"
                            value={time.to}
                            onChange={(e) =>
                              handleTimeChange(day, index, "to", e.target.value)
                            }
                            className="border rounded px-2 py-1 text-sm"
                          />
                          {schedule[day].times.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeTimeSlot(day, index)}
                              className="h-4 w-8"
                              size={"icon"}
                            >
                              <X size={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="w-fit h-7 text-xs px-2"
                        onClick={() => addTimeSlot(day)}
                      >
                        + Add Time
                      </Button>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right: Block Dates */}
        <Card className="w-1/2 gap-4 px-2 h-full">
          <CardHeader className={"px-0"}>
            <CardTitle className={"px-0 flex flex-col gap-1"}>
              <h3 className="font-normal">Block Dates</h3>
              <p className="text-xs text-destructive font-normal">
                Add dates when you will be unavailable to take calls
              </p>
            </CardTitle>
            <CardContent className={"px-0 mt-2"}>
              <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    + Add Date
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <Calendar
                    mode="single"
                    selected={null}
                    onSelect={(date) => {
                      handleDateSelect(date);
                      setShowCalendar(false);
                    }}
                  />
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 items-center mt-4">
              {blockedDates.length > 0 ? (
                blockedDates.map((date, index) => (
                  <span
                    key={index}
                    className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
                  >
                    {date}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  No blocked dates
                </span>
              )}
            </CardFooter>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ExpertSchedulePage;
