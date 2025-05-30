import mongoose from "mongoose";
import { scheduleSchema } from "./schedule.model.js";

const calendarSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },
    reschedulePolicy: {
      type: String,
      enum: ["request", "direct"],
      default: "request",
    },
    minNoticeForReschedule: {
      type: String,
      enum: ["30 mins", "8 hrs", "24 hrs", "Anytime"],
      default: "24 hrs",
    },
    bookingPeriod: {
      type: String,
      enum: ["1 week", "2 weeks", "3 weeks", "1 month", "2 months"],
      default: "1 month",
    },
    meetingLocation: {
      zoomPro: {
        type: Boolean,
        default: false,
      },
      googleMeet: {
        type: Boolean,
        default: true,
      },
    },
    googleCalendarConnected: {
      type: Boolean,
      default: false,
    },
    blockDates: {
      type: [Date],
      default: ["2023-08-15", "2023-08-16", "2023-08-17"],
    },
    // NEW FIELD: Active schedule title
    activeSchedule: {
      type: String,
      default: "Default Schedule",
    },
    schedules: {
      type: [scheduleSchema],
      default: [
        {
          scheduleTitle: "Default Schedule",
        },
      ],
    },
  },
  { timestamps: true }
);

export const Calendar = mongoose.model("Calendar", calendarSchema);