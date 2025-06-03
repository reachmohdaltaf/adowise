  import { Booking } from "../models/booking.model.js";

  export const createBooking = async (req, res) => {
    try {
          console.log("Booking request body:", req.body);  // <-- Add this here
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

  export const bookingsAsSeeker = async (req, res) => {
    try {
      const userId = req.user._id; // Provided by auth middleware

      const bookings = await Booking.find({ seekerId: userId })
        .populate("expertId", "name email")  // Optional: show expert info
        .sort({ startTime: -1 });

      res.status(200).json({
        message: "Bookings as seeker fetched successfully",
        bookings,
      });
    } catch (error) {
      console.error("Error fetching bookings as seeker:", error);
      res.status(500).json({ error: "Failed to fetch bookings as seeker" });
    }
  };

