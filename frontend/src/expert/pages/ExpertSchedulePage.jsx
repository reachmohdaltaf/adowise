"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { fetchCalendar } from "@/redux/features/calendarThunk";
import { Save, X, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// Helper function to convert backend schedule to local state format
const convertBackendSchedule = (backendSchedule) => {
  const result = {
    blockedDates: backendSchedule.blockDates || [],
    days: {}
  };
  
  daysOfWeek.forEach((day) => {
    const dayObj = backendSchedule.availableDays.find(
      (d) => d.day.toLowerCase() === day
    );

    if (dayObj) {
      result.days[day.charAt(0).toUpperCase() + day.slice(1)] = {
        isChecked: dayObj.timeSlots.some((slot) => slot.isAvailable),
        times: dayObj.timeSlots.map((slot) => ({
          from: slot.from,
          to: slot.to,
        })),
      };
    } else {
      result.days[day.charAt(0).toUpperCase() + day.slice(1)] = {
        isChecked: false,
        times: [{ from: "", to: "" }],
      };
    }
  });
  return result;
};

const ExpertSchedulePage = () => {
  const dispatch = useDispatch();
  const { calendar } = useSelector((state) => state.calendar);

  const [schedules, setSchedules] = useState({});
  const [activeSchedule, setActiveSchedule] = useState("");
  const [newScheduleName, setNewScheduleName] = useState("");

  useEffect(() => {
    dispatch(fetchCalendar());
  }, [dispatch]);

  useEffect(() => {
    if (calendar && calendar.schedules && calendar.schedules.length > 0) {
      const initialSchedules = {};
      calendar.schedules.forEach((sched) => {
        const key = sched.scheduleTitle || "Default Schedule";
        initialSchedules[key] = convertBackendSchedule(sched);
      });
      setSchedules(initialSchedules);
      setActiveSchedule(Object.keys(initialSchedules)[0] || "Default Schedule");
    }
  }, [calendar]);

  const currentSchedule = schedules[activeSchedule] || { days: {}, blockedDates: [] };

  const handleCheckboxChange = (day, checked) => {
    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        days: {
          ...prev[activeSchedule].days,
          [day]: {
            isChecked: checked,
            times: checked ? prev[activeSchedule].days[day].times : [{ from: "", to: "" }],
          },
        },
      },
    }));
  };

  const handleTimeChange = (day, index, key, value) => {
    const updatedTimes = [...currentSchedule.days[day].times];
    updatedTimes[index][key] = value;

    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        days: {
          ...prev[activeSchedule].days,
          [day]: {
            ...prev[activeSchedule].days[day],
            times: updatedTimes,
          },
        },
      },
    }));
  };

  const addTimeSlot = (day) => {
    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        days: {
          ...prev[activeSchedule].days,
          [day]: {
            ...prev[activeSchedule].days[day],
            times: [...prev[activeSchedule].days[day].times, { from: "", to: "" }],
          },
        },
      },
    }));
  };

  const removeTimeSlot = (day, index) => {
    const updatedTimes = currentSchedule.days[day].times.filter((_, i) => i !== index);

    setSchedules((prev) => ({
      ...prev,
      [activeSchedule]: {
        ...prev[activeSchedule],
        days: {
          ...prev[activeSchedule].days,
          [day]: {
            ...prev[activeSchedule].days[day],
            times: updatedTimes,
          },
        },
      },
    }));
  };

  const handleAddSchedule = () => {
    if (!newScheduleName.trim()) return;
    setSchedules((prev) => ({
      ...prev,
      [newScheduleName]: {
        blockedDates: [],
        days: daysOfWeek.reduce((acc, day) => {
          acc[day.charAt(0).toUpperCase() + day.slice(1)] = {
            isChecked: false,
            times: [{ from: "", to: "" }],
          };
          return acc;
        }, {}),
      },
    }));
    setActiveSchedule(newScheduleName);
    setNewScheduleName("");
  };

  return (
    <div className="min-h-screen bg-gray-50 sm:bg-background">
      {/* Mobile-optimized navigation */}
      <nav className="flex items-center bg-background sticky top-12 z-10 gap-2 mb-2 sm:mb-4 w-full overflow-x-auto px-3 sm:px-2 py-2 border-b sm:border-b-0 shadow-sm sm:shadow-none">
        <div className="flex items-center gap-2 min-w-max">
          {Object.keys(schedules).map((name) => (
            <Button
              key={name}
              variant={activeSchedule === name ? "default" : "outline"}
              className="rounded-md h-9 sm:h-8 px-3 sm:px-4 text-sm whitespace-nowrap"
              onClick={() => setActiveSchedule(name)}
            >
              {name}
            </Button>
          ))}

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-md h-9 sm:h-8 px-2 sm:px-3 flex-shrink-0">
                <Plus size={16} className="sm:hidden" />
                <span className="hidden sm:inline">+</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-md mx-auto">
              <div className="flex flex-col gap-4 p-2">
                <h3 className="font-medium text-lg">Add New Schedule</h3>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Schedule Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter schedule name"
                    value={newScheduleName}
                    onChange={(e) => setNewScheduleName(e.target.value)}
                    className="border h-11 border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Button onClick={handleAddSchedule} className="h-11">
                  Save Schedule
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Main Schedule Card - now full width */}
      <div className="px-2">
        <Card className="w-full shadow-sm">
          <CardHeader className="px-3 sm:px-4 pb-3 sm:pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-2">
              <CardTitle className="font-medium text-lg sm:text-base text-gray-900">
                {activeSchedule}
              </CardTitle>
              <Button size="sm" className="h-9 px-4 w-full sm:w-auto">
                <Save size={16} className="mr-2" />
                Save changes
              </Button>
            </div>
          </CardHeader>

          <CardContent className="px-2 sm:px-4 space-y-4 sm:space-y-4">
            {daysOfWeek.map((day) => {
              const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);
              return (
                <div key={day} className="space-y-3 sm:space-y-0 sm:flex sm:items-start sm:justify-between sm:gap-4 p-3 sm:p-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none border sm:border-0">
                  {/* Day label and checkbox */}
                  <div className="flex items-center gap-3 min-w-[120px]">
                    <Checkbox
                      className="bg-gray-200 h-5 w-5"
                      id={day}
                      checked={currentSchedule.days[dayCapitalized]?.isChecked || false}
                      onCheckedChange={(checked) =>
                        handleCheckboxChange(dayCapitalized, checked)
                      }
                    />
                    <label
                      htmlFor={day}
                      className="text-base sm:text-sm font-medium sm:font-normal text-gray-900 sm:text-muted-foreground cursor-pointer"
                    >
                      {dayCapitalized}
                    </label>
                  </div>

                  {/* Time slots */}
                  <div className="flex-1 space-y-3 sm:space-y-2">
                    {currentSchedule.days[dayCapitalized]?.isChecked ? (
                      <>
                        {currentSchedule.days[dayCapitalized].times.map((time, index) => (
                          <div key={index} className="flex items-center gap-2 sm:gap-2">
                            <input
                              type="time"
                              value={time.from}
                              onChange={(e) =>
                                handleTimeChange(dayCapitalized, index, "from", e.target.value)
                              }
                              className="border rounded-md px-0 py-1 sm:px-2 sm:py-1 text-base sm:text-sm h-11 sm:h-auto flex-1 sm:flex-none sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-gray-500 font-medium">to</span>
                            <input
                              type="time"
                              value={time.to}
                              onChange={(e) =>
                                handleTimeChange(dayCapitalized, index, "to", e.target.value)
                              }
                              className="border rounded-md px-1 py-2 sm:px-2 sm:py-1 text-base sm:text-sm h-11 sm:h-auto flex-1 sm:flex-none sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {currentSchedule.days[dayCapitalized].times.length > 1 && (
                              <Button
                                type="button"
                                onClick={() => removeTimeSlot(dayCapitalized, index)}
                                className="h-9 w-9 sm:h-6 sm:w-6 p-0 flex-shrink-0"
                                size="icon"
                                variant="destructive"
                              >
                                <X size={16} className="sm:hidden" />
                                <X size={12} className="hidden sm:block" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full sm:w-fit text-sm sm:text-xs h-9 sm:h-auto font-medium"
                          onClick={() => addTimeSlot(dayCapitalized)}
                        >
                          <Plus size={16} className="mr-1 sm:hidden" />
                          Add time slot
                        </Button>
                      </>
                    ) : (
                      <p className="text-sm sm:text-xs text-muted-foreground py-2">
                        No time slots available
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertSchedulePage;