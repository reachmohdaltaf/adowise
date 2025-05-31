import { Booking } from "../models/booking.model.js";

export const createBooking = async (req, res) => {
  try {
    const {
      calendarId,
      seekerId,
      expertId,
      scheduleTitle,
      startTime,
      endTime,
      meetingLink,
      locationType,
      customLocation,
      notes,
      paymentStatus,    // e.g., "pending" or "success"
      paymentIntentId,  // e.g., Razorpay order ID or payment ID
    } = req.body;

    // Create new booking document
    const newBooking = new Booking({
      calendarId,
      seekerId,
      expertId,
      scheduleTitle,
      startTime,
      endTime,
      meetingLink,
      locationType,
      customLocation,
      notes,
      paymentStatus,
      paymentIntentId,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ error: "Failed to create booking" });
  }
};
