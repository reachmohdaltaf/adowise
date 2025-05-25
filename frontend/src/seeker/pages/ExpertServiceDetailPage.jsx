import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Timer } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ExpertServiceDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Hardcoded sample time slots
  const [timeSlots] = useState([
    { date: "2025-05-25", slot: "9:00 AM - 10:00 AM" },
    { date: "2025-05-25", slot: "5:00 AM - 11:00 AM" },
    { date: "2025-05-25", slot: "6:00 AM - 11:00 AM" },
    { date: "2025-05-25", slot: "7:00 AM - 11:00 AM" },
    { date: "2025-05-25", slot: "8:00 AM - 11:00 AM" },
    { date: "2025-05-26", slot: "2:00 PM - 3:00 PM" },
  ]);

  const { username, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { service, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(fetchServiceById(id));
  }, [dispatch, id]);

  const filteredSlots = selectedDate
    ? timeSlots.filter(
        (slot) =>
          new Date(slot.date).toDateString() === selectedDate.toDateString()
      )
    : [];

  if (loading) return <LoadingSpinner />;
  if (error)
    return <div>Error: {error.message || "Failed to load service"}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="px-2 text-foreground md:px-4 py-6 bg-primary min-h-screen flex gap-4 items-start justify-center">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="py-6 hidden lg:flex md:absolute left-6 md:left-10 md:top-12"
      >
        <ArrowLeft className="mr-2" /> Back
      </Button>

      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start gap-6 justify-center w-full">
        {/* Service Card */}
        <Card className="py-0 px-0 md:w-1/2 w-full  rounded-4xl text-start">
          <CardHeader className="px-6 py-6 rounded-t-4xl bg-muted">
            <div className="flex justify-between gap-5 items-center">
              <div className="px-2">
               <div className="flex items-start justify-between gap-2">
                 <h1 className="md:text-3xl md:w-3/4 text-2xl font-bold">{service.title}</h1>
                <div className="min-w-[64px] min-h-[64px] w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                  <img
                    src={
                      service.profileImage ||
                      "https://dummyimage.com/600x400/000/fff"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover min-w-[64px] min-h-[64px]"
                  />
                </div>
               </div>
                <p className="text-sm text-destructive">@{username}</p>
                <p className="text-2xl flex justify-between mt-3">
                  ₹{service.amount}
                  <span className="text-destructive flex items-center font-normal text-sm md:text-lg gap-1">
                    <Timer /> {service.duration} mins meeting
                  </span>
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <div className="text-lg text-destructive font-normal">
              {service.description.split("\n").map((line, index) => (
                <p key={index} className="mb-2 font-normal">
                  {line}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-4">
              {Array.isArray(service.tags) &&
                service.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm py-2 px-4 rounded-full bg-muted"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            <Button
              disabled={!(selectedDate && selectedTime)}
              className="w-full py-6 md:flex hidden mt-10"
            >
              Book now
            </Button>

            <div className="mt-10  sm:flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:block lg:hidden py-6">
                    Check Availablity
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md w-full p-2 rounded-xl">
                  <div>
                    <p className="text-lg font-semibold">See Availability:</p>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(""); // Reset selected time when date changes
                      }}
                    />
                  </div>

                  {selectedDate && (
                    <div className="mt-4 space-y-2">
                      <p className="font-medium">
                        Selected Date: {selectedDate.toDateString()}
                      </p>
                      <p className="font-medium">Available Time Slots:</p>
                      {filteredSlots.length > 0 ? (
                        <div className="gap-2 flex  flex-col">
                          {filteredSlots.map((slot, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedTime(slot.slot)}
                              className={`px-4 py-2 text-sm rounded-full border ${
                                selectedTime === slot.slot
                                  ? "bg-destructive text-white"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              {slot.slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          No available time slots.
                        </p>
                      )}
                    </div>
                  )}
                  <Button className={"py-6"}>Book Now</Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Availability Calendar */}
        <Card className="px-2 hidden lg:block rounded-4xl">
          <div>
            <p className="text-lg font-semibold">See Availability:</p>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setSelectedTime(""); // Reset selected time when date changes
              }}
            />
          </div>

          {selectedDate && (
            <div className="mt-4 space-y-2">
              <p className="font-medium">
                Selected Date: {selectedDate.toDateString()}
              </p>
              <p className="font-medium">Available Time Slots:</p>
              {filteredSlots.length > 0 ? (
                <div className="gap-2 flex h-32 overflow-auto flex-col">
                  {filteredSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTime(slot.slot)}
                      className={`px-4 py-2 text-sm rounded-full border ${
                        selectedTime === slot.slot
                          ? "bg-destructive text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      {slot.slot}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No available time slots.
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ExpertServiceDetails;
