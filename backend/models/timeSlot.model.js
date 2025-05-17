import mongoose from "mongoose";

// Define timeSlotSchema
export const timeSlotSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Ensures format HH:mm
  },
  to: {
    type: String,
    required: true,
    match: /^([01]\d|2[0-3]):([0-5]\d)$/, // Ensures format HH:mm
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { _id: false });
