const bookingSchema = new mongoose.Schema(
    {
      serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      expertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      scheduledFor: {
        type: Date,
        required: true,
      },
      meetingLink: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed"],
        default: "pending",
      },
      platformUsed: {
        type: String,
        enum: ["google_meet"],
        default: "google_meet",
      },
    },
    { timestamps: true }
  );
  
  export const Booking = mongoose.model("Booking", bookingSchema);
  