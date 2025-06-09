import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    username: { type: String, required: true,  unique: true, trim: true },
    password: { type: String, required: false},
    googleId: { type: String, default: null },
    phoneNumber: { type: String, unique: true, sparse: true, trim: true },
    role: { type: String, enum: ["seeker", "expert"], default: "seeker" },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },

    // Profile details
    about: { type: String, default: "", trim: true },
    profession: { type: String, default: "", trim: true },
    experience: { type: String, default: "", trim: true },
    skills: { type: [String], default: [] },

    image: { type: String, default: "https://placehold.co/600x400" },
    bannerImage: { type: String, default: "" },

    location: {
      city: { type: String, default: "", trim: true },
      state: { type: String, default: "", trim: true },
      country: { type: String, default: "", trim: true },
    },

    // Social media links
    socialLinks: {
      linkedin: {
        url: { type: String, default: "" },
        isConnected: { type: Boolean, default: false },
      },
      github: {
        url: { type: String, default: "" },
        isConnected: { type: Boolean, default: false },
      },
      twitter: {
        url: { type: String, default: "" },
        isConnected: { type: Boolean, default: false },
      },
      instagram: {
        url: { type: String, default: "" },
        isConnected: { type: Boolean, default: false },
      },
      website: {
        url: { type: String, default: "" },
        isConnected: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
