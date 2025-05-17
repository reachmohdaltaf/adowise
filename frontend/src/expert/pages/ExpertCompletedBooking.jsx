import React from 'react';
import ExpertCompletedBookingCard from '../components/ExpertCompletedBookingCard';

const completedData = [
  {
    type: 'Video Call',
    date: 'Sun, 02 Mar',
    time: '02:45 - 03:00 PM',
    title: 'Discovery Call',
    description: 'Mohd Altaf',
    status: 'Completed',
  },
  {
    type: 'Voice Call',
    date: 'Mon, 03 Mar',
    time: '11:00 - 11:30 AM',
    title: 'Review Meeting',
    description: 'Ayesha Khan',
    status: 'Completed',
  },
  {
    type: 'Chat',
    date: 'Tue, 04 Mar',
    time: '01:00 - 01:15 PM',
    title: 'Final Discussion',
    description: 'Rahul Verma',
    status: 'Completed',
  },
  {
    type: 'Video Call',
    date: 'Wed, 05 Mar',
    time: '03:30 - 04:00 PM',
    title: 'Feedback Session',
    description: 'Nikita Patel',
    status: 'Completed',
  },
  {
    type: 'Video Call',
    date: 'Wed, 05 Mar',
    time: '03:30 - 04:00 PM',
    title: 'Feedback Session',
    description: 'Nikita Patel',
    status: 'Completed',
  },
];

export const ExpertCompletedBooking = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {completedData.map((booking, index) => (
        <ExpertCompletedBookingCard
          key={index}
          type={booking.type}
          date={booking.date}
          time={booking.time}
          title={booking.title}
          description={booking.description}
          status={booking.status}
        />
      ))}
    </div>
  );
};

export default ExpertCompletedBooking;