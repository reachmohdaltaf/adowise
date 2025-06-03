import { createSlice } from '@reduxjs/toolkit';
import { createBooking, fetchBookingsAsSeeker } from './bookingThunk';
const initialState = {
  booking: null,
  loading: false,
  error: null,
  success: false,
  bookings: [],
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    clearBookingState: (state) => {
      state.booking = null;
      state.error = null;
      state.loading = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.booking = action.payload.booking;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //@ get bookings as a seeker
      .addCase(fetchBookingsAsSeeker.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchBookingsAsSeeker.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.bookings;
        state.success = true;
      })
      .addCase(fetchBookingsAsSeeker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
  },
});

export const { clearBookingState } = bookingSlice.actions;
export default bookingSlice.reducer;