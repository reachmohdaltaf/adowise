import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateUserRole = createAsyncThunk(
    'user/updateRole',
    async({userId, role}, thunkAPI) => {
        try {
            const res = await axiosInstance.put('user/updateRole', {userId, newRole: role});
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (formData, thunkAPI) => {
        try {
            const res = await axiosInstance.put('user/updateProfile', formData);
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getUserProfile = createAsyncThunk(
    'user/profile',
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('user/profile');
            return res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);