import { createSlice } from "@reduxjs/toolkit";
import { createService, deleteServiceById, fetchAllServices, MyServices, updateService } from "./serviceThunk";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        services: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(createService.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createService.fulfilled, (state, action) => {
            state.services.push(action.payload)
            state.loading = false
        })
        .addCase(createService.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // @fetch my services
        .addCase(MyServices.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(MyServices.fulfilled, (state, action) => {
            state.services = action.payload
            state.loading = false
        })
        .addCase(MyServices.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
        // @fetch all services
        .addCase(fetchAllServices.pending, (state) => {
            state.loading = true
            state.error = null
              console.log('loading true');
        })
        .addCase(fetchAllServices.fulfilled, (state, action) => {
            state.services = action.payload
            state.loading = false
        })
        .addCase(fetchAllServices.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //@ update service
        .addCase(updateService.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateService.fulfilled, (state, action) => {
            state.loading = false
            state.services.push(action.payload)   
        })
        .addCase(updateService.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //@delete service
        .addCase(deleteServiceById.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteServiceById.fulfilled, (state, action) => {
            state.loading = false
            state.services.push(action.payload)   
        })
        .addCase(deleteServiceById.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

export default serviceSlice.reducer