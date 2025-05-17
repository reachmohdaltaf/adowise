import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    expertId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      enum: ["1:1", "dm", "webinar"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    autoGenerateLink: {
      type: Boolean,
      default: false,
    },
    availability: [
      {
        day: {
          type: String,
          enum: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
          ],
        },
        from: String,
        to: String,
      },
    ],

    // 🔽 Add the missing fields below
    generateWithAI: {
      type: Boolean,
      default: false,
    },
    allowCustomPayment: {
      type: Boolean,
      default: false,
    },
    hideService: {
      type: Boolean,
      default: false,
    },
    slashPricing: {
      type: Boolean,
      default: false,
    },
    sellRecording: {
      type: Boolean,
      default: false,
    },
    recordingPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Service = mongoose.model("services", serviceSchema);
