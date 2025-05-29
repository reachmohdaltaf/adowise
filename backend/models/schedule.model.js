import mongoose from "mongoose";
import { timeSlotSchema } from "./timeSlot.model.js";

// Schedule Schema used inside calendarSchema
export const scheduleSchema = new mongoose.Schema({
  scheduleTitle: {
    type: String,
    required: true,
    trim: true
  },
  availableDays: {
    type: [
      {
        day: {
          type: String,
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          required: true,
          lowercase: true,
          trim: true
        },
        timeSlots: {
          type: [timeSlotSchema],
          default: [
            { from: "09:00", to: "12:00", isAvailable: true },
            { from: "14:00", to: "18:00", isAvailable: true }
          ]
        }
      }
    ],
    default: [
      { day: "monday" },
      { day: "tuesday" },
      { day: "wednesday" },
      { day: "thursday" },
      { day: "friday" }
    ]
  },
  blockDates: {
    type: [Date],
    default: []
  }
}, { timestamps: true });
