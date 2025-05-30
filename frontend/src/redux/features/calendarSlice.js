import { createSlice } from "@reduxjs/toolkit";
import { fetchCalendar, updateCalendar } from "./calendarThunk";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    calendar: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetCalendar: (state) => {
      state.calendar = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetching calendar data
      .addCase(fetchCalendar.fulfilled, (state, action) => {
        state.calendar = action.payload;
        state.loading = false;
      })
      .addCase(fetchCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // update calendar data
      .addCase(updateCalendar.fulfilled, (state, action) => {
        // Set only the calendar part from the response payload
        state.calendar = action.payload.calendar;
        state.loading = false;
      })
      .addCase(updateCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCalendar } = calendarSlice.actions;
export default calendarSlice.reducer;
