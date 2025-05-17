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
  schedules: [scheduleSchema]
}, { timestamps: true });

export const Calendar = mongoose.model("Calendar", calendarSchema);
