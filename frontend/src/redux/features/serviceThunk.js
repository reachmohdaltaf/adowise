import axiosInstance from "@/api/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const createService = createAsyncThunk(
    'service/create',
    async(formData, thunkAPI) => {
        try {
            const res = await axiosInstance.post('service/create', formData);
            console.log("service created", res.data)
            return res.data
        } catch (error) {
            toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const updateService = createAsyncThunk(
    'service/update',
    async({serviceId, formData}, thunkAPI) => {
        console.log("Service ID:", serviceId);  // This will help you confirm if the ID is missing
        try {
            const res = await axiosInstance.put(`service/update/${serviceId}`, formData);
            console.log("service updated", res.data)
            return res.data
        } catch (error) {
            toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const MyServices = createAsyncThunk(
    'service/myservices',
    async(_, thunkAPI) => {
        try {
            const res = await axiosInstance.get('service/myservices');
            console.log("get my service data in thunk", res.data)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const fetchAllServices = createAsyncThunk(
  "service/getall",
  async ({ page = 1, limit = 6 }, thunkAPI) => {
    try {
      const res = await axiosInstance.get(
        `service/getall?page=${page}&limit=${limit}`
      );
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const fetchServiceById = createAsyncThunk(
    'service/fetch',
    async(serviceId, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`service/${serviceId}`);
            console.log("get service data in thunk", res.data)
            return res.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }

)

export const deleteServiceById = createAsyncThunk(
    'service/delete',
    async(serviceId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`service/delete/${serviceId}`);
            toast.success("Service deleted successfully")
            return res.data
        } catch (error) {
            toast.error(error.response.data.message)
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)