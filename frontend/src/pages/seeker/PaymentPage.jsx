import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRazorpayOrder } from "@/redux/features/paymentThunk";
import { createBooking } from "@/redux/features/bookingThunk";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CreditCard, User } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData);
    } else {
      navigate(-1);
    }
  }, [location.state, navigate]);

  const isDMBooking = () => {
    return bookingData?.selectedTime === "DM" || 
           bookingData?.locationType === "directMessage";
  };

  const parseDateTime = (date, timeSlot) => {
    try {
      // Skip parsing for DM bookings
      if (isDMBooking()) {
        const resultDate = new Date(date);
        resultDate.setHours(12, 0, 0, 0); // Set default time for DM bookings
        return resultDate;
      }

      
      if (!timeSlot || typeof timeSlot !== 'string') {
        throw new Error("Time slot is not a valid string");
      }

      let startTimeStr;
      
      if (timeSlot.includes(" - ")) {
        [startTimeStr] = timeSlot.trim().split(" - ");
      } else {
        startTimeStr = timeSlot.trim();
      }
      
      if (!startTimeStr) {
        throw new Error("Could not extract start time from time slot");
      }

      const timeMatch = startTimeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)$/);
      
      if (!timeMatch) {
        throw new Error(`Invalid time format: ${startTimeStr}. Expected format like '10:00 AM'`);
      }

      let [_, hours, minutes, ampm] = timeMatch;
      hours = parseInt(hours, 10);
      minutes = parseInt(minutes, 10);

      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error(`Invalid parsed values - Hours: ${hours}, Minutes: ${minutes}`);
      }

      if (hours < 1 || hours > 12) {
        throw new Error(`Invalid hours: ${hours}. Must be between 1-12`);
      }
      
      if (minutes < 0 || minutes > 59) {
        throw new Error(`Invalid minutes: ${minutes}. Must be between 0-59`);
      }

      if (ampm.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
      } else if (ampm.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
      }

      const resultDate = new Date(date);
      
      if (isNaN(resultDate.getTime())) {
        throw new Error(`Invalid base date: ${date}`);
      }
      
      resultDate.setHours(hours, minutes, 0, 0);
      
      return resultDate;
    } catch (error) {
      console.error("❌ PARSE ERROR:", error.message);
      return null;
    }
  };

  const handlePayment = async () => {
    if (!bookingData || !user) {
      alert("Missing booking information or user not logged in.");
      return;
    }

    setIsProcessing(true);

    try {
      console.log("💰 PAYMENT - Original booking data:", bookingData);

      // Skip time parsing for DM bookings
      let startTime, endTime;
      
      if (isDMBooking()) {
        // For DM bookings, use current date and default times
        startTime = new Date(bookingData.selectedDate);
        startTime.setHours(12, 0, 0, 0); // Default to noon
        endTime = new Date(startTime.getTime() + bookingData.duration * 60 * 1000);
      } else {
        // For regular bookings, parse the time
        startTime = parseDateTime(bookingData.selectedDate, bookingData.selectedTime);
        
        if (!startTime || isNaN(startTime.getTime())) {
          console.error("❌ TIME PARSING FAILED");
          alert(`Invalid start time format. 
          
Selected time: ${bookingData.selectedTime}
Expected format: "10:00 AM - 11:00 AM" or "10:00 AM"

Please go back and select a valid time slot.`);
          setIsProcessing(false);
          return;
        }

        endTime = new Date(startTime.getTime() + bookingData.duration * 60 * 1000);
      }

      console.log("✅ PAYMENT - Final parsed times:", {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString()
      });

      // Create Razorpay order
      const order = await dispatch(
        createRazorpayOrder({ amount: bookingData.amount, userId: user._id })
      ).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: bookingData.title,
        description: "Service booking",
        order_id: order.id,
        handler: async function (response) {
          const bookingPayload = {
            calendarId: bookingData.calendarId,
            seekerId: user._id,
            expertId: bookingData.expertId,
            scheduleTitle: bookingData.title,
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            meetingLink: bookingData.meetingLink || "",
            locationType: isDMBooking() ? "directMessage" : "googleMeet",
            customLocation: "",
            notes: `Booking for ${bookingData.title} with ${bookingData.expertName}`,
            paymentStatus: "success",
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };

          console.log("📤 BOOKING - Payload being sent:", bookingPayload);

          try {
            await dispatch(createBooking(bookingPayload)).unwrap();
            alert("Booking successful!");
            navigate("/seeker/dashboard/bookings/upcoming");
          } catch (err) {
            console.error("❌ BOOKING FAILED:", err);
            alert("Booking failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#6366F1" },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ PAYMENT ERROR:", error);
      alert("Payment failed. Please try again.");
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const selectedDate = new Date(bookingData.selectedDate);
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen py-5">
      <div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {isDMBooking() ? "Complete Your DM Request" : "Complete Your Booking"}
          </h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {isDMBooking() ? "DM Request Summary" : "Booking Summary"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <img
                  src={bookingData.expertImage || "https://dummyimage.com/600x400/000/fff"}
                  alt="Expert"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{bookingData.title}</h3>
                <p className="text-sm text-destructive">
                  with {bookingData.expertName}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm text-destructive">{formattedDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-destructive" />
                <div>
                  <p className="text-sm font-medium">
                    {isDMBooking() ? "Request Type" : "Time"}
                  </p>
                  <p className="text-sm text-destructive">
                    {isDMBooking() ? "Direct Message" : `${bookingData.selectedTime} (${bookingData.duration} mins)`}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹{bookingData.amount}</span>
            </div>
            <p className="text-sm text-destructive mt-2">
              Secure payment powered by Razorpay
            </p>
          </CardContent>
        </Card>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-green-700 hover:bg-green-600 py-6 text-lg"
        >
          {isProcessing ? "Processing..." : `Pay ₹${bookingData.amount}`}
        </Button>

        <p className="text-xs text-destructive text-center mt-4">
          By proceeding with payment, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;