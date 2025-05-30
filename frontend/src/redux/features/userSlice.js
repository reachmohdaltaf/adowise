  import { createSlice } from "@reduxjs/toolkit";
  import { getUserProfile, updateProfile, updateUserRole } from "./userThunk";

  const userSlice = createSlice({
    name: "user",
    initialState: {
      user: null,
      loading: false,
      updating: false, // for profile update
      error: null,
    },
    reducers: {
       clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.updating = false;
      state.error = null;
    },},
    extraReducers: (builder) => {
      builder
        .addCase(updateUserRole.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUserRole.fulfilled, (state, action) => {
          state.user = action.payload.user; // assuming updated user comes back here
          state.loading = false;
        })
        .addCase(updateUserRole.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        // @step update profile
        .addCase(updateProfile.pending, (state) => {
          state.updating = true; // use updating for profile updates
          state.error = null;
        })
        .addCase(updateProfile.fulfilled, (state, action) => {
          state.user = action.payload.user; // assuming updated user comes back here
          state.updating = false;
        })
        .addCase(updateProfile.rejected, (state, action) => {
          state.updating = false;
          state.error = action.payload;
        })
        // @step get user profile
        .addCase(getUserProfile.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
          state.loading = false;
        })
        .addCase(getUserProfile.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });

  export const { clearUser } = userSlice.actions;

  export default userSlice.reducer;
