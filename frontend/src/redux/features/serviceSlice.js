import { createSlice } from "@reduxjs/toolkit";
import {
  createService,
  deleteServiceById,
  fetchAllServices,
  fetchServiceById,
  MyServices,
  updateService,
} from "./serviceThunk";

const serviceSlice = createSlice({
  name: "service",
  initialState: {
    services: [],
    service: null, // 👈 add this
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  reducers: {
    resetServices: (state) => {
      state.services = [];
      state.page = 1;
      state.totalPages = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.services.push(action.payload);
        state.loading = false;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // @fetch my services
      .addCase(MyServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(MyServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(MyServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // @fetch single service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // @fetch all services
      .addCase(fetchAllServices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.loading = false;

        const incoming = action.payload.services;
        const existingIds = new Set(state.services.map((s) => s._id));
        const filtered = incoming.filter((s) => !existingIds.has(s._id));

        state.services = [...state.services, ...filtered];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchAllServices.rejected, (state, action) => {
        state.loading = false;
        // ✅ Optional: don't set error for "Already fetched"
        if (action.payload !== "Already fetched") {
          state.error = action.payload;
        }
      })

      //@ update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        // Find index of updated service & replace
        const index = state.services.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
      })

      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //@delete service
      .addCase(deleteServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(deleteServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetServices } = serviceSlice.actions;
export default serviceSlice.reducer;
