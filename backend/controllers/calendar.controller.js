import { Calendar } from "../models/calendar.model.js";
import mongoose from "mongoose";
export const getCalendar = async (req, res) => {
  try {
     req.user = req.user._id; // assuming user ID is added by auth middleware

    const calendar = await Calendar.findOne({ userId: req.user });

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    res.status(200).json(calendar);
  } catch (error) {
    console.error("Get Calendar error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCalendar = async (req, res) => {
  try {
    const userId = req.user._id;
    // Extract fields to update from the request body
    const {
      timezone,
      reschedulePolicy,
      minNoticeForReschedule,
      bookingPeriod,
      meetingLocation,
      googleCalendarConnected,
      blockDates,
      schedules,
      activeSchedule // NEW FIELD
    } = req.body;

    // Find the user's calendar
    let calendar = await Calendar.findOne({ userId });
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    // Update the fields only if they exist in the request body
    if (timezone) calendar.timezone = timezone;
    if (reschedulePolicy) calendar.reschedulePolicy = reschedulePolicy;
    if (minNoticeForReschedule) calendar.minNoticeForReschedule = minNoticeForReschedule;
    if (bookingPeriod) calendar.bookingPeriod = bookingPeriod;
    if (meetingLocation) calendar.meetingLocation = meetingLocation;
    if (googleCalendarConnected !== undefined) calendar.googleCalendarConnected = googleCalendarConnected;
    if (blockDates) calendar.blockDates = blockDates;
    if (schedules) calendar.schedules = schedules;
    
    // NEW: Update active schedule
    if (activeSchedule) {
      // Validate that the active schedule exists in the schedules array
      const scheduleExists = calendar.schedules.some(
        schedule => schedule.scheduleTitle === activeSchedule
      );
      
      if (scheduleExists) {
        calendar.activeSchedule = activeSchedule;
      } else {
        return res.status(400).json({ 
          error: "Active schedule does not exist in the schedules list" 
        });
      }
    }

    // Save updated calendar
    await calendar.save();
    
    res.status(200).json({ 
      message: "Calendar updated successfully", 
      calendar,
      activeSchedule: calendar.activeSchedule // Return the active schedule
    });
  } catch (error) {
    console.error("Update Calendar error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Optional: Add a separate endpoint to just update the active schedule
export const updateActiveSchedule = async (req, res) => {
  try {
    const userId = req.user._id;
    const { activeSchedule } = req.body;

    if (!activeSchedule) {
      return res.status(400).json({ error: "Active schedule is required" });
    }

    const calendar = await Calendar.findOne({ userId });
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }

    // Validate that the schedule exists
    const scheduleExists = calendar.schedules.some(
      schedule => schedule.scheduleTitle === activeSchedule
    );

    if (!scheduleExists) {
      return res.status(400).json({ 
        error: "Schedule does not exist" 
      });
    }

    calendar.activeSchedule = activeSchedule;
    await calendar.save();

    res.status(200).json({ 
      message: "Active schedule updated successfully",
      activeSchedule: calendar.activeSchedule
    });
  } catch (error) {
    console.error("Update active schedule error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// GET /calendar/user/:userId
export const getCalendarByUserId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const calendar = await Calendar.findOne({
      userId: new mongoose.Types.ObjectId(id),
    }).populate("userId");

    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found for this user" });
    }

    res.status(200).json(calendar);
  } catch (error) {
    console.error("Get calendar for user error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};







