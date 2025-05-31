import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/api/axiosInstance';


export const createRazorpayOrder = createAsyncThunk(
  'payment/createRazorpayOrder',
  async ({ amount, userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/payments/razorpay', {
        amount,
        userId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  }
);

// redux/features/bookingThunk.js

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

