import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceById } from "@/redux/features/serviceThunk";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Timer } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SeekerCalendarPage from "./SeekerCalendarPage";
import { getCalendarByUserId } from "@/redux/features/calendarThunk";

const ExpertServiceDetailPage = () => {
  const dispatch = useDispatch();
  const { username, id } = useParams();
  console.log(username, id)
  const navigate = useNavigate();

  // Fetch service details from Redux
  const { service, loading, error } = useSelector((state) => state.service);
  
  // Fetch calendar data from Redux
  const { calendar, loading: calendarLoading } = useSelector((state) => state.calendar);
  console.log(calendar)

  // Local state for selected date/time
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  // Helper function to generate time slots based on calendar data
  const generateTimeSlots = (calendar, selectedDate) => {
    if (!calendar || !calendar.schedules || !selectedDate) return [];

    // Find active schedule or use the first one with time slots
    let activeSchedule = calendar.schedules.find(
      schedule => schedule.scheduleTitle === calendar.activeSchedule
    );

    // If active schedule has no time slots, find the first schedule with time slots
    if (!activeSchedule || !hasAnyTimeSlots(activeSchedule)) {
      activeSchedule = calendar.schedules.find(schedule => hasAnyTimeSlots(schedule));
    }

    if (!activeSchedule) return [];

    // Get day name from selected date
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    
    // Find the day configuration
    const dayConfig = activeSchedule.availableDays.find(day => day.day === dayName);
    
    if (!dayConfig || !dayConfig.timeSlots || dayConfig.timeSlots.length === 0) {
      return [];
    }

    // Check if the selected date is blocked
    const selectedDateString = selectedDate.toISOString().split('T')[0];
    const isBlockedGlobally = calendar.blockDates.some(blockedDate => 
      new Date(blockedDate).toISOString().split('T')[0] === selectedDateString
    );
    const isBlockedInSchedule = activeSchedule.blockDates.some(blockedDate => 
      new Date(blockedDate).toISOString().split('T')[0] === selectedDateString
    );

    if (isBlockedGlobally || isBlockedInSchedule) {
      return [];
    }

    // Generate time slots for available time ranges
    const timeSlots = [];
    
    dayConfig.timeSlots.forEach(timeSlot => {
      if (timeSlot.isAvailable) {
        // Parse time slots (assuming they're in HH:MM format)
        const [fromHour, fromMinute] = timeSlot.from.split(':').map(Number);
        const [toHour, toMinute] = timeSlot.to.split(':').map(Number);
        
        // Handle same time (might be a single slot)
        if (fromHour === toHour && fromMinute === toMinute) {
          const timeString = formatTime(fromHour, fromMinute);
          timeSlots.push({
            date: selectedDateString,
            slot: `${timeString} - ${formatTime(fromHour + 1, fromMinute)}`, // Assuming 1-hour slots
            startTime: timeSlot.from,
            endTime: formatTime24(fromHour + 1, fromMinute)
          });
        } else {
          // Generate slots for the time range (assuming 1-hour intervals)
          let currentHour = fromHour;
          let currentMinute = fromMinute;
          
          while (currentHour < toHour || (currentHour === toHour && currentMinute < toMinute)) {
            const startTime = formatTime(currentHour, currentMinute);
            const nextHour = currentMinute + 60 >= 60 ? currentHour + 1 : currentHour;
            const nextMinute = (currentMinute + 60) % 60;
            const endTime = formatTime(nextHour, nextMinute);
            
            timeSlots.push({
              date: selectedDateString,
              slot: `${startTime} - ${endTime}`,
              startTime: formatTime24(currentHour, currentMinute),
              endTime: formatTime24(nextHour, nextMinute)
            });
            
            currentHour = nextHour;
            currentMinute = nextMinute;
            
            // Prevent infinite loop
            if (currentHour > 23) break;
          }
        }
      }
    });

    return timeSlots;
  };

  // Helper function to format time to 12-hour format
  const formatTime = (hour, minute) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    const displayMinute = minute.toString().padStart(2, '0');
    return `${displayHour}:${displayMinute} ${ampm}`;
  };

  // Helper function to format time to 24-hour format
  const formatTime24 = (hour, minute) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  // Helper function to check if a date is available
  const isDateAvailable = (date) => {
    if (!calendar || !calendar.schedules || calendar.schedules.length === 0) return false;

    // Try to find active schedule, fallback to any schedule with time slots
    let activeSchedule = calendar.schedules.find(
      schedule => schedule.scheduleTitle === calendar.activeSchedule
    );

    // If active schedule has no time slots, find the first schedule with time slots
    if (!activeSchedule || !hasAnyTimeSlots(activeSchedule)) {
      activeSchedule = calendar.schedules.find(schedule => hasAnyTimeSlots(schedule));
    }

    if (!activeSchedule) return false;

    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const dayConfig = activeSchedule.availableDays.find(day => day.day === dayName);
    
    // Check if day has available time slots
    const hasAvailableSlots = dayConfig && dayConfig.timeSlots && 
      dayConfig.timeSlots.some(slot => slot.isAvailable);

    // Check if date is not blocked
    const dateString = date.toISOString().split('T')[0];
    const isBlocked = calendar.blockDates.some(blockedDate => 
      new Date(blockedDate).toISOString().split('T')[0] === dateString
    ) || (activeSchedule.blockDates && activeSchedule.blockDates.some(blockedDate => 
      new Date(blockedDate).toISOString().split('T')[0] === dateString
    ));

    return hasAvailableSlots && !isBlocked;
  };

  // Helper function to check if a schedule has any time slots
  const hasAnyTimeSlots = (schedule) => {
    return schedule.availableDays.some(day => 
      day.timeSlots && day.timeSlots.length > 0 && 
      day.timeSlots.some(slot => slot.isAvailable)
    );
  };

  // Generate dynamic time slots based on selected date and calendar data
  const dynamicTimeSlots = generateTimeSlots(calendar, selectedDate);

  // Fetch service details when id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchServiceById(id));
    }
  }, [dispatch, id]);

  // Fetch calendar by user ID when service is loaded
  useEffect(() => {
    if (service && service.expertId) {
      console.log("Fetching calendar for user ID:", service.expertId);
      dispatch(getCalendarByUserId(service.expertId));
    }
  }, [dispatch, service]);

        console.log("Fetching calendar for user ID:", service.expertId);


  // Reset selected time when date changes
  useEffect(() => {
    setSelectedTime("");
  }, [selectedDate]);

  if (loading || calendarLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error.message || "Failed to load service"}</div>;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="px-2 text-foreground md:px-4 py-6 bg-primary min-h-screen flex gap-4 items-start justify-center">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="py-6 hidden lg:flex md:absolute left-6 md:left-10 md:top-12"
      >
        <ArrowLeft className="mr-2" /> Back
      </Button>

      <div className="mt-6 md:mt-10 flex flex-col md:flex-row items-start gap-6 justify-center w-full">
        {/* Service Card */}
        <Card className="py-0 px-0 md:w-1/2 w-full rounded-4xl text-start">
          <CardHeader className="px-6 py-6 rounded-t-4xl bg-muted">
            <div className="flex justify-between gap-5 items-center">
              <div className="px-2">
                <div className="flex items-start justify-between gap-2">
                  <h1 className="md:text-3xl md:w-3/4 text-2xl font-bold">{service.title}</h1>
                  <div className="min-w-[64px] min-h-[64px] w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                    <img
                      src={service.profileImage || "https://dummyimage.com/600x400/000/fff"}
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
                <p key={index} className="mb-2 font-normal">{line}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-4">
              {Array.isArray(service.tags) &&
                service.tags.map((tag, index) => (
                  <span key={index} className="text-sm py-2 px-4 rounded-full bg-muted">
                    {tag}
                  </span>
                ))}
            </div>

            {/* Book Now Button for Desktop */}
            <Button disabled={!(selectedDate && selectedTime)} className="w-full py-6 md:flex hidden mt-10">
              Book now
            </Button>

            {/* Mobile Dialog for Calendar */}
            <div className="mt-10 sm:flex flex-col gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full sm:block lg:hidden py-6">Check Availability</Button>
                </DialogTrigger>
                <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md w-full p-2 rounded-xl">
                  <SeekerCalendarPage
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    selectedTime={selectedTime}
                    setSelectedTime={setSelectedTime}
                    timeSlots={dynamicTimeSlots}
                    calendar={calendar}
                    isDateAvailable={isDateAvailable}
                  />
                  <Button disabled={!(selectedDate && selectedTime)} className="py-6 mt-4 w-full">
                    Book Now
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Calendar */}
        <Card className="px-2 hidden lg:block rounded-4xl">
          <SeekerCalendarPage
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            timeSlots={dynamicTimeSlots}
            calendar={calendar}
            isDateAvailable={isDateAvailable}
          />
        </Card>
      </div>
    </div>
  );
};

export default ExpertServiceDetailPage