import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const updateUserRole = createAsyncThunk(
    'user/updateRole',
    async({userId, role}, thunkAPI) => {
        try {
            const res = await axiosInstance.put('user/updateRole', {userId, newRole: role});
            toast.success(`Role updated successfully to ${res.data.user.role}`);
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)