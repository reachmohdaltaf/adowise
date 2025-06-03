import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/bookings/create', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create booking');
    }
  }
);

export const fetchBookingsAsSeeker = createAsyncThunk(
  'booking/seeker',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/bookings/seeker');
      console.log("fetchBookingsAsSeeker", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
    }
  }
);
