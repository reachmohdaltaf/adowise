import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCalendar = createAsyncThunk(
  "calendar/fetchCalendar",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/calendar/mycalendar");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCalendar = createAsyncThunk(
  "calendar/update",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/calendar/update", formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
