import React from "react";
import { Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ExpertServiceDetails from "../pages/seeker/ExpertServiceDetailPage";
import SeekerChatBot from "../pages/seeker/SeekerChatBot";
import CalendarBookingPage from "@/pages/seeker/CalendarBookingPage";

const PublicRoutes = ({ user }) => {
  return (
    <React.Fragment>
      {/* Standalone public routes */}
      <Route path="chatbot" element={<SeekerChatBot />} />
      <Route path=":username/service/:id" element={<ExpertServiceDetails />} />
      {/* Fixed: Use a proper route path for calendar booking */}
      <Route
        path="/calendar/booking/:serviceId"
        element={<CalendarBookingPage />}
      />

      {/* Layout-wrapped public routes */}
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            !user ? (
              <HomePage />
            ) : (
              <Navigate
                to={
                  user.role === "seeker"
                    ? "/seeker/dashboard/home"
                    : "/expert/dashboard/home"
                }
                replace
              />
            )
          }
        />
        <Route
          path="login"
          element={
            !user ? (
              <LoginPage />
            ) : (
              <Navigate
                to={
                  user.role === "seeker"
                    ? "/seeker/dashboard/home"
                    : "/expert/dashboard/home"
                }
                replace
              />
            )
          }
        />
        <Route path="register" element={!user ? <RegisterPage /> : null} />
      </Route>
    </React.Fragment>
  );
};

export default PublicRoutes;
