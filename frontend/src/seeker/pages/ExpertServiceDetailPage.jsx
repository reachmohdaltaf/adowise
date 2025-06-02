// ExpertServiceDetailPage.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import {
  createBooking,
  createRazorpayOrder,
} from "@/redux/features/paymentThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Timer } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SeekerCalendarPage from "./SeekerCalendarPage";
import { getCalendarByUserId } from "@/redux/features/calendarThunk";
import { generateTimeSlots, isDateAvailable } from "@/utils/timeSlot";

const ExpertServiceDetailPage = () => {
  const dispatch = useDispatch();
  const { username, id } = useParams();
  const navigate = useNavigate();

  const { service, loading, error } = useSelector((state) => state.service);
  const { calendar, loading: calendarLoading } = useSelector(
    (state) => state.calendar
  );

  console.log("Calendar data:", calendar);
  const { user } = useSelector((state) => state.auth); // Assuming you have an auth slice

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const dynamicTimeSlots = generateTimeSlots(calendar, selectedDate);

  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

useEffect(() => {
  if (service && service?.expertId) {
    console.log("Dispatching calendar fetch for:", service.expertId);
dispatch(getCalendarByUserId(service?.expertId?._id));
  }
}, [dispatch, service]);

useEffect(() => {
  console.log("Calendar data:", calendar);
}, [calendar]);


  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  const handlePayment = async () => {
    if (!user) {
      alert("Please log in to book a service.");
      return;
    }

    const amountToPay = service.amount; // Removed * 100

    try {
      const order = await dispatch(
        createRazorpayOrder({ amount: amountToPay, userId: user._id })
      ).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: service.title,
        description: "Service booking",
        order_id: order.id,
        handler: async function (response) {
          const bookingPayload = {
            calendarId: calendar._id, // or pass this from the backend if not in frontend
            seekerId: user._id,
            expertId: service.expertId,
            scheduleTitle: service.title,
            startTime: new Date(
              `${selectedDate.toDateString()} ${selectedTime}`
            ), // or format properly
            endTime: new Date(
              new Date(
                `${selectedDate.toDateString()} ${selectedTime}`
              ).getTime() +
                service.duration * 60000
            ), // add duration
            meetingLink: "", // You can generate one later or add a placeholder
            locationType: "online", // or dynamic based on service
            customLocation: "", // if needed
            notes: "", // optional
            paymentStatus: "success",
            paymentIntentId: response.razorpay_payment_id,
          };

          await dispatch(createBooking(bookingPayload));
          alert("Booking successful!");
          navigate("/bookings");
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading || calendarLoading) return <LoadingSpinner />;
  if (error)
    return <div>Error: {error.message || "Failed to load service"}</div>;
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
    disabled={!(selectedDate && selectedTime)}
    className="w-full py-6 md:flex hidden mt-10 "
    onClick={handlePayment}
  >
    Book 1:1 Session
  </Button>
) : (
  <Button
    className="w-full py-6 md:flex hidden mt-10 "
    onClick={handlePayment}
  >
    Send DM
  </Button>
)}


            <div className="mt-10 sm:flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  {service.type === "1:1" ? (
                    <Button
                      variant={""}
                      className={'py-6 md:hidden w-full'}
                    >
                      Book 1:1 Session
                    </Button>
                  ) : (
                    <Button
                      variant={""}
                      className={'py-6 md:hidden w-full'}
                    >
                      Send DM
                    </Button>
                  )}
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md w-full p-2 rounded-xl">
                  <SeekerCalendarPage
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    timeSlots={dynamicTimeSlots}
                    calendar={calendar}
                    isDateAvailable={(date) => isDateAvailable(date, calendar)}
                  />
                  <Button
                    disabled={!(selectedDate && selectedTime)}
                    className="py-6 mt-4 w-full"
                    onClick={handlePayment}
                  >
                    Book Now
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

       {service.type == "1:1" && <Card className="px-2 hidden lg:block rounded-4xl">
          <SeekerCalendarPage
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            timeSlots={dynamicTimeSlots}
            calendar={calendar}
            isDateAvailable={(date) => isDateAvailable(date, calendar)}
          />
        </Card>}
      </div>
    </div>
  );
};

export default ExpertServiceDetailPage;
