import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import userReducer from '../features/userSlice.js';
import serviceReducer from '../features/serviceSlice.js';
import calendarReducer from '../features/calendarSlice.js';

const store = configureStore({
  reducer: {
     auth: authReducer,
     user: userReducer,
     service: serviceReducer, 
     calendar: calendarReducer,
     },
});

export default store;
