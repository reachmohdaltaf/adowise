// models/booking.model.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    calendarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Calendar",
      required: true,
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    scheduleTitle: {
      type: String,
      default: "Default Schedule",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled", "rescheduled"],
      default: "pending",
    },
    meetingLink: {
      type: String,
      default: "",
    },
    locationType: {
      type: String,
      enum: ["googleMeet", "zoomPro", "custom"],
      default: "googleMeet",
    },
    customLocation: {
      type: String,
      default: "",
    },
    notes: {
      type: String,
      default: "",
    },
    isRescheduleRequested: {
      type: Boolean,
      default: false,
    },
    isCancelledBySeeker: {
      type: Boolean,
      default: false,
    },
    isCancelledByExpert: {
      type: Boolean,
      default: false,
    },
    // Payment related fields
    paymentStatus: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentIntentId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model("Booking", bookingSchema);
