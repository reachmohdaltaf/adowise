import mongoose from "mongoose";
import { scheduleSchema } from "./schedule.model.js";

const calendarSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true // Speeds up queries by userId
  },
  timezone: {
    type: String,
    default: "Asia/Kolkata"
  },
  reschedulePolicy: {
    type: String,
    enum: ["request", "direct"],
    default: "request"
  },
  minNoticeForReschedule: {
    type: String,
    enum: ["30 mins", "8 hrs", "24 hrs", "Anytime"],
    default: "24 hrs"
  },
  bookingPeriod: {
    type: String,
    enum: ["1 week", "2 weeks", "3 weeks", "1 month", "2 months"],
    default: "1 month"
  },
 meetingLocation: {
  zoomPro: {
    type: Boolean,
    default: false
  },
  googleMeet: {
    type: Boolean,
    default: true // set to true if Google Meet is enabled by default
  }
}
,
 schedules: {
  type: [scheduleSchema],
  default: [
    {
      scheduleTitle: "Default Schedule",
      // availableDays and blockDates use their defaults from scheduleSchema
    }
  ]
}

}, { timestamps: true });

export const Calendar = mongoose.model("Calendar", calendarSchema);
