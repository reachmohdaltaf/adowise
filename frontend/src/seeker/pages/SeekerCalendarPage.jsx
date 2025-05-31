// Updated SeekerCalendarPage.js
import React from "react";
import { Calendar } from "@/components/ui/calendar";

const SeekerCalendarPage = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  timeSlots = [],
  calendar,
  isDateAvailable
}) => {
  
  // Custom date matcher for disabled dates
  const disabledDates = (date) => {
    // Disable past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return true;

    // Check booking period limit if specified
    if (calendar?.bookingPeriod) {
      const maxDate = new Date();
      const period = calendar.bookingPeriod;
      if (period.includes('month')) {
        const months = parseInt(period) || 1;
        maxDate.setMonth(maxDate.getMonth() + months);
        if (date > maxDate) return true;
      }
    }

    // Allow date selection even if no time slots (user can see "no slots available" message)
    // Only disable if explicitly blocked
    if (!calendar || !calendar.schedules) return false;

    const dateString = date.toISOString().split('T')[0];
    const isBlocked = calendar.blockDates.some(blockedDate => 
      new Date(blockedDate).toISOString().split('T')[0] === dateString
    );

    return isBlocked;
  };

  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-4">See Availability:</p>
      
      {/* Display active schedule info */}
      {calendar && (
        <div className="mb-4 p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium">
            Schedule: {calendar.activeSchedule || 'Default'}
          </p>
          <p className="text-xs text-muted-foreground">
            Timezone: {calendar.timezone}
          </p>
          {/* Debug info - remove in production */}
          <p className="text-xs text-blue-600 mt-1">
            Active Schedule Slots: {calendar.schedules.find(s => s.scheduleTitle === calendar.activeSchedule)?.availableDays.reduce((total, day) => total + day.timeSlots.length, 0) || 0}
          </p>
        </div>
      )}

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          if (date) {
            setSelectedDate(date);
            setSelectedTime(""); // Reset selected time
          }
        }}
        disabled={disabledDates}
        className="rounded-md border"
      />
      
      {selectedDate && (
        <div className="mt-4 space-y-2">
          <p className="font-medium">
            Selected Date: {selectedDate.toDateString()}
          </p>
          <p className="font-medium">Available Time Slots:</p>
          {timeSlots.length > 0 ? (
            <div className="gap-2 flex  flex-col">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTime(slot.slot)}
                  className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                    selectedTime === slot.slot
                      ? "bg-destructive text-white"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {slot.slot}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-lg">
              <p>No available time slots for this date.</p>
              {calendar && !calendar.schedules?.length && (
                <p className="mt-2">No schedules configured.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Reschedule policy info */}
      {calendar?.reschedulePolicy && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs font-medium text-blue-800">
            Reschedule Policy: {calendar.reschedulePolicy}
          </p>
          {calendar.minNoticeForReschedule && (
            <p className="text-xs text-blue-600">
              Minimum notice: {calendar.minNoticeForReschedule}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SeekerCalendarPage;