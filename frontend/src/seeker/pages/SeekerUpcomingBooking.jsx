import React, { useEffect } from 'react';
import SeekerUpcomingBookingCard from '../components/SeekerUpcomingBookingCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsAsSeeker } from '@/redux/features/bookingThunk';

const SeekerUpcomingBooking = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingsAsSeeker());
  }, [dispatch]);

  function formatDateTime(start, end) {
    const optionsDate = { weekday: 'short', day: '2-digit', month: 'short' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true };

    const startDate = new Date(start);
    const endDate = new Date(end);

    const date = startDate.toLocaleDateString('en-US', optionsDate);
    const time = `${startDate.toLocaleTimeString('en-US', optionsTime)} - ${endDate.toLocaleTimeString('en-US', optionsTime)}`;

    return { date, time };
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => {
          const { date, time } = formatDateTime(booking.startTime, booking.endTime);
          return (
            <SeekerUpcomingBookingCard
              key={booking._id}
              title={booking.scheduleTitle}
              description={booking.expertId?.name || 'Unknown Expert'}
              status={booking.status}
              date={date}
              time={time}
              type={booking.locationType || 'N/A'}
            />
          );
        })
      ) : (
        <p>No upcoming bookings found.</p>
      )}
    </div>
  );
};

export default SeekerUpcomingBooking;
