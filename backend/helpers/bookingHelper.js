// helpers/bookingHelper.js (or inside your controller file)
import { Booking } from "../models/booking.model.js";

export async function isBookingConflict(expertId, startTime, endTime) {
  const conflict = await Booking.findOne({
    expertId,
    status: { $in: ["confirmed", "pending"] }, // consider confirmed and pending bookings as conflicting
    $or: [
      {
        startTime: { $lt: endTime, $gte: startTime },
      },
      {
        endTime: { $gt: startTime, $lte: endTime },
      },
      {
        startTime: { $lte: startTime },
        endTime: { $gte: endTime },
      },
    ],
  });
  return !!conflict;
}
