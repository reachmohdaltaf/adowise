import mongoose from "mongoose";
import { timeSlotSchema } from "./timeSlot.model.js";

// Schedule Schema used inside calendarSchema
export const scheduleSchema = new mongoose.Schema({
  scheduleTitle: {
    type: String,
    required: true,
    trim: true
  },
  availableDays: [
    {
      day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true,
        lowercase: true, // auto-convert
        trim: true
      },
      timeSlots: [timeSlotSchema] // Embed timeSlotSchema
    }
  ],
  blockDates: {
    type: [Date], // Changed from String to Date for better querying
    default: []
  }
}, { timestamps: true });
