import React, { useEffect } from "react";
import SeekerUpcomingBookingCard from "../../components/seeker/SeekerUpcomingBookingCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsAsSeeker } from "@/redux/features/bookingThunk";
import { Skeleton } from "@/components/ui/skeleton";
import BookingCardSkeleton from "@/components/common/BookingCardSkeleton";

const SeekerUpcomingBooking = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookingsAsSeeker());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <BookingCardSkeleton key={i} className="h-32 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Error loading bookings: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
      {bookings && bookings.length > 0 ? (
        bookings.map((booking) => (
          <SeekerUpcomingBookingCard
            key={booking._id}
            booking={booking}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg">No upcoming bookings found.</p>
          <p className="text-gray-400 text-sm mt-2">
            Schedule a consultation to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default SeekerUpcomingBooking;