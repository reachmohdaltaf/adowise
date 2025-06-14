// ExpertServiceDetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Timer, Calendar } from "lucide-react";
import { getCalendarByUserId } from "@/redux/features/calendarThunk";

const ExpertServiceDetailPage = () => {
  const dispatch = useDispatch();
  const { username, id } = useParams();
  const navigate = useNavigate();

  const { service, loading, error } = useSelector((state) => state.service);
  const { calendar } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (service && service?.expertId) {
      dispatch(getCalendarByUserId(service?.expertId?._id));
    }
  }, [dispatch, service]);

  useEffect(() => {
    console.log("user data:", user);
    console.log("Calendar data:", calendar);
    console.log("Service data:", service);
  }, [calendar, user, service]);

  const handleProceedToPayment = () => {
    if (!user) {
      alert("Please log in to book a service.");
      return;
    }

    // For DM services, navigate directly to payment
    const bookingData = {
      serviceId: service._id,
      expertId: service.expertId._id,
      calendarId: calendar?._id,
      selectedDate: new Date().toISOString(),
      selectedTime: "DM",
      amount: service.amount,
      duration: service.duration,
      title: service.title,
      expertName: service.expertId.name,
      expertImage: service.expertId.image
    };

    // Pass booking data through navigation state
    navigate('/calendar/dashboard/payment', { 
      state: { bookingData },
      replace: false 
    });
  };

  const handleOpenCalendar = () => {
    if (!user) {
      alert("Please log in to book a service.");
      return;
    }

    // Navigate to calendar page with service data
    const calendarData = {
      serviceId: service._id,
      expertId: service.expertId._id,
      calendarId: calendar?._id,
      amount: service.amount,
      duration: service.duration,
      title: service.title,
      expertName: service.expertId.name,
      expertImage: service.expertId.image,
      username: username
    };

    // Fixed: Navigate to proper calendar route with actual service ID
    navigate(`/calendar/booking/${service._id}`, { 
      state: { calendarData },
      replace: false 
    });
  };

  if (loading) return <div><LoadingSpinner /></div>;
  if (error) return <div>Error: {error.message || "Failed to load service"}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="px-2 text-foreground md:px-4 py-6 bg-primary min-h-full flex gap-4 items-start justify-center">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="py-6 hidden lg:flex md:absolute left-6 md:left-10 md:top-12"
      >
        <ArrowLeft className="mr-2" /> Back
      </Button>

      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start gap-6 justify-center w-full">
        <Card className="py-0 px-0 md:w-1/2 w-full rounded-4xl text-start">
          <CardHeader className="px-6 py-6 rounded-t-4xl bg-muted">
            <div className="flex justify-between gap-5 items-center">
              <div className="px-2">
                <div className="flex items-start justify-between gap-2">
                  <h1 className="md:text-3xl md:w-3/4 text-2xl font-bold">
                    {service.title}
                  </h1>
                  <div className="min-w-[64px] min-h-[64px] w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={
                        service.expertId.image ||
                        "https://dummyimage.com/600x400/000/fff"
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
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

            {service.type === "1:1" ? (
              <Button
                className="w-full py-6 mt-10"
                onClick={handleOpenCalendar}
              >
                <Calendar className="mr-2" />
                Select Date & Time
              </Button>
            ) : (
              <Button
                className="w-full py-6 mt-10"
                onClick={handleProceedToPayment}
              >
                Send DM
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertServiceDetailPage;