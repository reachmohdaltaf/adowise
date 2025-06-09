// PaymentPage.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createRazorpayOrder } from "@/redux/features/paymentThunk";
import { createBooking } from "@/redux/features/bookingThunk";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, User, CreditCard } from "lucide-react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { user } = useSelector((state) => state.auth);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    // Get booking data from navigation state
    if (location.state?.bookingData) {
      setBookingData(location.state.bookingData);
    } else {
      // Redirect back if no booking data
      navigate(-1);
    }
  }, [location.state, navigate]);

  // Enhanced parseDateTime function
  const parseDateTime = (date, time) => {
    try {
      const baseDate = new Date(date);
      let hours, minutes;
      
      if (time.includes(':')) {
        const [hourStr, minuteStr] = time.split(':');
        hours = parseInt(hourStr, 10);
        minutes = parseInt(minuteStr, 10);
      } else if (time.includes(' ')) {
        const timeParts = time.split(' ');
        const timeValue = timeParts[0];
        const ampm = timeParts[1];
        
        const [hourStr, minuteStr] = timeValue.split(':');
        hours = parseInt(hourStr, 10);
        minutes = parseInt(minuteStr, 10);
        
        if (ampm.toLowerCase() === 'pm' && hours !== 12) {
          hours += 12;
        } else if (ampm.toLowerCase() === 'am' && hours === 12) {
          hours = 0;
        }
      } else {
        throw new Error('Invalid time format');
      }

      if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid time values');
      }

      const resultDate = new Date(baseDate);
      resultDate.setHours(hours, minutes, 0, 0);
      return resultDate;
    } catch (error) {
      console.error('Error parsing date/time:', error, { date, time });
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
      const startTime = parseDateTime(bookingData.selectedDate, bookingData.selectedTime);
      
      if (!startTime || isNaN(startTime.getTime())) {
        alert("Invalid start time. Please go back and select a valid time.");
        setIsProcessing(false);
        return;
      }

      const endTime = new Date(startTime.getTime() + (bookingData.duration * 60 * 1000));

      console.log("Parsed Start time:", startTime.toISOString());
      console.log("Calculated End time:", endTime.toISOString());

      // Create Razorpay order
      const order = await dispatch(
        createRazorpayOrder({ 
          amount: bookingData.amount, 
          userId: user._id 
        })
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
            scheduleTitle: "Default Schedule",
            startTime: startTime.toISOString(),
            endTime: endTime.toISOString(),
            meetingLink: "https://meet.google.com/abc-defg-hij",
            locationType: "googleMeet",
            customLocation: "",
            notes: "Booking created via frontend",
            paymentStatus: "pending",
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          };

          console.log("Booking payload before dispatch:", bookingPayload);

          try {
            await dispatch(createBooking(bookingPayload)).unwrap();
            alert("Booking successful!");
            navigate("/seeker/dashboard/bookings/upcoming");
          } catch (bookingError) {
            console.error("Booking creation failed:", bookingError);
            alert("Booking failed. Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error("Payment Error:", error);
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
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen py-5 ">
      <div className="">
        {/* Header */}
        <div className="mb-6">
         
          <h1 className="text-2xl font-bold text-foreground">Complete Your Booking</h1>
        </div>

        {/* Booking Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Booking Summary
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
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm text-destructive">
                    {bookingData.selectedTime} ({bookingData.duration} mins)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
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

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-green-700 hover:bg-green-600 py-6 text-lg"
        >
          {isProcessing ? (
            <>
              Processing...
            </>
          ) : (
            `Pay ₹${bookingData.amount}`
          )}
        </Button>

        {/* Terms */}
        <p className="text-xs text-destructive text-center mt-4">
          By proceeding with payment, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;