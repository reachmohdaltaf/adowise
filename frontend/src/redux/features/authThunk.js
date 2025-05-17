import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const signupUser = createAsyncThunk(
    'auth/signup',
    async (FormData, thunkAPI) => {
        try {
            const res = await axiosInstance.post('auth/signup', FormData);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async(FormData, thunkAPI) => {
        try {
            const res = await axiosInstance.post('auth/login', FormData);
            return res.data
        } catch (error) {
            toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async(_, thunkAPI) => {
        try {
            const res = await axiosInstance.post('auth/logout');
            return res.data
        } catch (error) {
            toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


export const authCheck = createAsyncThunk(
    'auth/check',
    async(_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('auth/me');
            console.log("authentication is checked in authThunk",res.data)
            return res.data
        } catch (error) {
            thunkAPI.dispatch(logout())
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)