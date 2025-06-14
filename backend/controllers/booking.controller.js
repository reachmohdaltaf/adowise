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
      locationType,
      customLocation,
      notes,
      paymentStatus,
      paymentIntentId,
    } = req.body;

    // Generate meeting link
    let meetingLink = "";
    if (locationType === "googleMeet") {
      // Option 1: Simple guaranteed-working link (recommended)
      meetingLink = "https://meet.google.com/new"; // Creates fresh room when clicked
      
     
    } else if (locationType === "custom") {
      meetingLink = customLocation;
    }

    // Create and save booking
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
  



  