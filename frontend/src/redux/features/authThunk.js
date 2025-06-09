import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, thunkAPI) => {
    try {
      const res = await axiosInstance.post("auth/send-otp", { email });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const res = await axiosInstance.post("auth/verify-otp", { email, otp });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const completeSignup = createAsyncThunk(
  "auth/completeSignup",
  async (formData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("auth/complete-signup", formData);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Keep your existing login, logout, authCheck thunks

export const loginUser = createAsyncThunk(
  "auth/login",
  async (FormData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("auth/login", FormData);
      return res.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.post("auth/logout");
    return res.data;
  } catch (error) {
    toast.error(error.response.data.message);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const authCheck = createAsyncThunk("auth/check", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("auth/me");
    console.log("authentication is checked in authThunk", res.data);
    return res.data;
  } catch (error) {
    thunkAPI.dispatch(logout());
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const googleSignup = createAsyncThunk(
  "auth/googleSignup",
  async (credential, thunkAPI) => {
    try {
      const res = await axiosInstance.post('auth/google-signup', { credential });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (credential, thunkAPI) => {
    try {
      const res = await axiosInstance.post('auth/google-login', { credential });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
