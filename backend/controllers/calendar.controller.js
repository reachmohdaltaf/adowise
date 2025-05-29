import { Calendar } from "../models/calendar.model.js";

export const getCalendar = async (req, res) => {
  try {
     req.user = req.user._id; // assuming user ID is added by auth middleware

    const calendar = await Calendar.findOne({ userId: req.user });

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    res.status(200).json(calendar);
  } catch (error) {
    console.error("Get Calendar error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};