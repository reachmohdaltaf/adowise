import React from "react";
import { Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ExpertServiceDetails from "../seeker/pages/ExpertServiceDetailPage";
import SeekerChatBot from "../seeker/pages/SeekerChatBot";

const PublicRoutes = ({ user }) => {
  return (
    <React.Fragment>
      {/* Standalone public routes */}
      <Route path="chatbot" element={<SeekerChatBot />} />
      <Route path=":username/service/:id" element={<ExpertServiceDetails />} />


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
        <Route
          path="register"
          element={!user ? <RegisterPage /> : null}
        />
      </Route>
    </React.Fragment>
  );
};

export default PublicRoutes;