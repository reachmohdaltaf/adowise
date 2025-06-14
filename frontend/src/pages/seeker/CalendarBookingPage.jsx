import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Timer, User, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { getCalendarByUserId } from "@/redux/features/calendarThunk";
import { generateTimeSlots, isDateAvailable } from "@/utils/timeSlot";

const CalendarBookingPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const { calendar } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  // Get data from navigation state
  const calendarData = location.state?.calendarData;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    if (!calendarData) {
      console.log("No calendar data found, redirecting back");
      navigate(-1);
      return;
    }

    if (calendarData.expertId) {
      console.log("Fetching calendar for expert:", calendarData.expertId);
      dispatch(getCalendarByUserId(calendarData.expertId));
    }
  }, [dispatch, calendarData, navigate]);

  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  useEffect(() => {
    console.log("Calendar Data:", calendarData);
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    console.log("Calendar:", calendar);
  }, [calendarData, selectedDate, selectedTime, calendar]);

  const handleProceedToPayment = () => {
    if (!user) {
      alert("Please log in to book a service.");
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }

    const bookingData = {
      serviceId: calendarData.serviceId,
      expertId: calendarData.expertId,
      calendarId: calendarData.calendarId,
      selectedDate: selectedDate.toISOString(),
      selectedTime: selectedTime,
      amount: calendarData.amount,
      duration: calendarData.duration,
      title: calendarData.title,
      expertName: calendarData.expertName,
      expertImage: calendarData.expertImage,
    };

    navigate("/seeker/dashboard/payment", {
      state: { bookingData },
      replace: false,
    });
  };

  const generateCalendarDays = () => {
    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const startDate = new Date(startOfMonth);
    const endDate = new Date(endOfMonth);
    
    startDate.setDate(startDate.getDate() - startDate.getDay());
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
    
    const days = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const today = new Date();
  
  // Modified to ensure we're working with proper time slot objects
  const dynamicTimeSlots = calendar ? generateTimeSlots(calendar, selectedDate) : [];
  
  // Function to format time slot for display
  const formatTimeSlot = (timeSlot) => {
    if (typeof timeSlot === 'string') return timeSlot;
    if (timeSlot.slot) return timeSlot.slot;
    if (timeSlot.startTime && timeSlot.endTime) {
      return `${timeSlot.startTime} - ${timeSlot.endTime}`;
    }
    return '';
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const isDayAvailable = (date) => {
    if (date < today.setHours(0, 0, 0, 0)) return false;
    return calendar ? isDateAvailable(date, calendar) : true;
  };

  const isDaySelected = (date) => {
    return selectedDate && 
           date.toDateString() === selectedDate.toDateString();
  };

  const isDayInCurrentMonth = (date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  if (!calendarData) {
    return (
      <div className="px-4 py-6 bg-primary min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Loading calendar data...</p>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="px-2 text-background md:px-4 py-6 bg-primary min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="py-2 px-4 text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-xl md:text-2xl font-bold text-center flex-1 mx-4">
          Select Date & Time
        </h1>
        <div className="w-[80px]"></div>
      </div>

      {/* Service Info Card */}
      <Card className="mb-6 mx-auto max-w-4xl">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              <img
                src={
                  calendarData.expertImage ||
                  "https://dummyimage.com/100x100/000/fff"
                }
                alt="Expert Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg md:text-xl font-semibold">
                {calendarData.title}
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                {calendarData.expertName} (@{calendarData.username})
              </p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-lg font-bold">
                  ₹{calendarData.amount}
                </span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  {calendarData.duration} mins meeting
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Calendar Section */}
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Date Selection */}
        <Card className="rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="md:flex hidden">Select Date</span>
              </h3>
              <div className="flex items-center ">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth(-1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium min-w-[120px] text-center">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateMonth(1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-medium p-2 text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((date, index) => {
                const isAvailable = isDayAvailable(date);
                const isSelected = isDaySelected(date);
                const isCurrentMonth = isDayInCurrentMonth(date);
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (isAvailable) {
                        console.log("Date selected:", date);
                        setSelectedDate(date);
                      }
                    }}
                    disabled={!isAvailable}
                    className={`
                      p-3 text-sm rounded-lg font-normal  transition-all duration-200
                      ${isSelected 
                        ? 'bg-primary text-primary-foreground shadow-md' 
                        : isAvailable 
                          ? 'hover:bg-muted border border-transparent hover:border-muted-foreground/20' 
                          : 'text-muted-foreground/50 cursor-not-allowed'
                      }
                      ${!isCurrentMonth ? 'opacity-50' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        {selectedDate && (
          <Card className="rounded-2xl">
            <CardHeader className="pb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Select Time
              </h3>
              <p className="text-sm text-muted-foreground">
                Available slots for {selectedDate.toLocaleDateString()}
              </p>
            </CardHeader>
            <CardContent>
              {dynamicTimeSlots.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {dynamicTimeSlots.map((timeSlot, index) => {
                    const timeString = formatTimeSlot(timeSlot);
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          console.log("Time selected:", timeSlot);
                          setSelectedTime(timeString);
                        }}
                        className={`
                          p-3 text-sm rounded-lg border transition-all duration-200
                          ${selectedTime === timeString
                            ? 'bg-primary text-primary-foreground border-primary shadow-md'
                            : 'border-muted-foreground/20 hover:border-muted-foreground/40 hover:bg-muted'
                          }
                        `}
                      >
                        {timeString}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No available time slots for this date</p>
                  <p className="text-sm">Please select another date</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Booking Summary */}
        {selectedDate && selectedTime && (
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-4 md:p-6">
              <h3 className="font-semibold mb-4 text-center">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{calendarData.title}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Expert:</span>
                  <span className="font-medium">{calendarData.expertName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{calendarData.duration} minutes</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between items-center">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="text-xl font-bold">₹{calendarData.amount}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Proceed Button */}
        <div className="sticky bg-background  py-4 px-2 rounded-2xl bottom-0  z-10">
          <Button
            disabled={!(selectedDate && selectedTime)}
            className="w-full py-6 text-lg shadow-lg"
            onClick={handleProceedToPayment}
          >
            {selectedDate && selectedTime 
              ? `Proceed to Payment - ₹${calendarData.amount}`
              : 'Select Date & Time to Continue'
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarBookingPage;