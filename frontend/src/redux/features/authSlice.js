import { createSlice } from "@reduxjs/toolkit";
import { 
  authCheck, 
  loginUser, 
  logout, 
  sendOtp,
  verifyOtp,
  completeSignup 
} from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
    isCheckAuth: false,
    otp: {
      email: null,
      verified: false,
      loading: false,
      error: null
    }
  },
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otp = {
        email: null,
        verified: false,
        loading: false,
        error: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Auth Check
      .addCase(authCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isCheckAuth = true;
      })
      .addCase(authCheck.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
        state.isCheckAuth = true;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.otp.loading = true;
        state.otp.error = null;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.otp.loading = false;
        state.otp.email = action.meta.arg; // The email that was passed to the thunk
        state.otp.verified = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otp.loading = false;
        state.otp.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.otp.loading = true;
        state.otp.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.otp.loading = false;
        state.otp.verified = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otp.loading = false;
        state.otp.error = action.payload;
      })

      // Complete Signup (after OTP verification)
      .addCase(completeSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        // Reset OTP state after successful signup
        state.otp = {
          email: null,
          verified: false,
          loading: false,
          error: null
        };
      })
      .addCase(completeSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        // Reset all auth state
        localStorage.removeItem("token");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetAuthState, resetOtpState } = authSlice.actions;
export default authSlice.reducer;