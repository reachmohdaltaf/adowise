import React from "react";
import ExpertUpcomingBookingCard from "../../components/expert/ExpertUpcomingBookingCard";

const bookingData = [
  {
    title: "Interview Call",
    description: "Anjali",
    status: "upcoming",
    date: "Sun, 02 Mar",
    time: "02:45 - 03:00 PM",
    type: "Video Call",
  },
  {
    title: "Mentorship Session",
    description: "Ravi Kumar",
    status: "upcoming",
    date: "Mon, 03 Mar",
    time: "10:00 - 10:30 AM",
    type: "Voice Call",
  },
  {
    title: "Follow-up Discussion",
    description: "Priya Sharma",
    status: "upcoming",
    date: "Tue, 04 Mar",
    time: "01:15 - 01:45 PM",
    type: "Video Call",
  },
];

const ExpertUpcomingBooking = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {bookingData.map((booking, index) => (
        <ExpertUpcomingBookingCard
          key={index}
          title={booking.title}
          description={booking.description}
          status={booking.status}
          date={booking.date}
          time={booking.time}
          type={booking.type}
        />
      ))}
    </div>
  );
};

export default ExpertUpcomingBooking;
