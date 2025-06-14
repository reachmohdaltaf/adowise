import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Clock,
  User,
  MapPin,
  Phone,
  Mail,
  Video,
} from "lucide-react";

const SeekerUpcomingBookingCard = ({ booking }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [isJoinEnabled, setIsJoinEnabled] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  // FIXED: Better date and time formatting
  const formatDateTime = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Check if dates are valid
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      console.error("Invalid date format:", { start, end });
      return { date: "Invalid Date", time: "Invalid Time" };
    }

    // Format date
    const optionsDate = { 
      weekday: "short", 
      day: "2-digit", 
      month: "short",
      year: "numeric"
    };
    
    // Format time with proper timezone handling
    const optionsTime = { 
      hour: "2-digit", 
      minute: "2-digit", 
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone // Use user's timezone
    };

    const date = startDate.toLocaleDateString("en-US", optionsDate);
    const startTime = startDate.toLocaleTimeString("en-US", optionsTime);
    const endTime = endDate.toLocaleTimeString("en-US", optionsTime);
    const time = `${startTime} - ${endTime}`;

 

    return { date, time };
  };

  const { date, time } = formatDateTime(booking.startTime, booking.endTime);

  // Countdown timer setup
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const start = new Date(booking.startTime);
      const diff = start - now;

      // Enable join button 10 minutes before meeting
      const joinThreshold = 10 * 60 * 1000; // 10 minutes in milliseconds
      
      if (diff <= joinThreshold) {
        setIsJoinEnabled(true);
      }

      if (diff <= 0) {
        setTimeLeft("Meeting Started");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [booking.startTime]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "cancelled":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <Card className="py-4 gap-0 px-3 overflow-hidden transition-all duration-300 ease-in-out">
      <CardTitle className="flex items-center gap-2">
        {booking.locationType === "googleMeet" ? (
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/23/2e/f8262b124f86a3f1de3e14356cc3/google-meet.webp"
            className="w-5 h-5"
            alt="Google Meet"
          />
        ) : (
          <Video className="w-5 h-5 text-blue-500" />
        )}
        <p className="text-xs text-gray-600">
          {date}, {time}
        </p>
      </CardTitle>

      <CardContent className="px-0 flex flex-col mt-2">
        <h2 className="font-semibold text-lg">{booking.scheduleTitle}</h2>
        <CardDescription className="mt-1 flex items-center gap-1">
          <User className="w-4 h-4" />
          <span>with {booking.expertId?.name || "Expert"}</span>
        </CardDescription>
      </CardContent>

      <CardFooter className="px-0 justify-between">
        <div className="flex gap-2">
          <p className="text-sm text-gray-600">Status:</p>
          <span
            className={`text-sm font-medium ${getStatusColor(booking.status)}`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="text-sm flex items-center gap-1"
          onClick={toggleDetails}
        >
          {isDetailsVisible ? "Hide" : "View"} Details
          {isDetailsVisible ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </Button>
      </CardFooter>

      {/* Sliding Details Section */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isDetailsVisible ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t pt-4 mt-2 space-y-3">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Expert</p>
              <p className="text-sm font-medium">
                {booking.expertId?.name || "Expert"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm">{booking.expertId?.email || "Not provided"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="text-sm">{date}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Time</p>
              <p className="text-sm">{time}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm">
                {booking.locationType === "googleMeet"
                  ? "Google Meet"
                  : booking.customLocation || "Virtual Meeting"}
              </p>
            </div>
          </div>

          {booking.notes && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500 mb-1">Notes</p>
              <p className="text-sm text-gray-700">{booking.notes}</p>
            </div>
          )}

          {booking.meetingLink && (
            <div className="pt-2 space-y-2">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">
                  {isJoinEnabled
                    ? "🟢 Meeting is ready to join!"
                    : `⏰ Meeting starts in: ${timeLeft}`}
                </p>
                {!isJoinEnabled && (
                  <p className="text-xs text-gray-500 mt-1">
                    Join button will be enabled 10 minutes before the meeting
                  </p>
                )}
              </div>

              <Button
                variant="default"
                size="sm"
                className="w-full"
                disabled={!isJoinEnabled}
                onClick={() =>
                  isJoinEnabled && window.open(booking.meetingLink, "_blank")
                }
              >
                {isJoinEnabled ? "Join Meeting Now" : "Join Meeting (Not Available Yet)"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SeekerUpcomingBookingCard;