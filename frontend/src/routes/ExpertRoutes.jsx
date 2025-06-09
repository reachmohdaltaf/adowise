import React from "react";
import { Route, Navigate } from "react-router-dom";

import ExpertLayout from "../expert/components/Layout/ExpertLayout";

// Import expert pages
import ExpertHomePage from "../expert/pages/ExpertHomePage";
import ExpertServicePage from "../expert/pages/ExpertServicePage";
import ExpertAnalyticsPage from "../expert/pages/ExpertAnalyticsPage";
import ExpertTestimonialsPage from "../expert/pages/ExpertTestimonialsPage";
import ExpertPaymentsPage from "../expert/pages/ExpertPaymentsPage";
import ExpertBookingPage from "../expert/pages/ExpertBookingPage";
import ExpertUpcomingBooking from "../expert/pages/ExpertUpcomingBooking";
import ExpertCompletedBooking from "../expert/pages/ExpertCompletedBooking";
import ExpertPriorityDm from "../expert/pages/ExpertPriorityDm";
import SeekerPendingMessages from "../expert/pages/SeekerPendingMessages";
import ExpertAnsweredSeeker from "../expert/pages/ExpertAnsweredSeeker";
import ExpertSettingPage from "../expert/pages/ExpertSettingPage";
import ExpertProfile from "../expert/pages/ExpertProfile";
import OnetoOneCallServicePage from "../expert/pages/OnetoOneCallServicePage";
import PriorityDmServicePage from "../expert/pages/PriorityDmServicePage";
import WebinarServicePage from "../expert/pages/WebinarServicePage";
import CreateServciePage from "../expert/pages/CreateServicePage";
import CreateOneToOnepage from "../expert/pages/CreateOneToOnepage";
import CreateDmPage from "../expert/pages/CreateDmPage";
import CreateWebinarPage from "../expert/pages/CreateWebinarPage";
import CreateServicePage from "../expert/pages/CreateServicePage";
import ExpertMessagePage from "../expert/pages/ExpertMessagePage";
import ExpertLeadPage from "../expert/pages/ExpertLeadPage";
import UpdateServicePage from "../expert/pages/UpdateServicePage";
import ExpertSchedulePage from "../expert/pages/ExpertSchedulePage";
import ExpertCalendarPage from "../expert/pages/ExpertCalendarPage";
import ExpertAvailabilityPage from "../expert/pages/ExpertAvailabilityPage";
import PostToLinkedinPage from "@/expert/pages/PostToLinkedinPage";

const ExpertRoutes = ({ user }) => {
  return (
    <React.Fragment>
      <Route
        path="/expert/dashboard"
        element={
          user?.role === "expert" ? (
            <ExpertLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="home" element={<ExpertHomePage />} />
        <Route path="post-to-linkedin" element={<PostToLinkedinPage />} />

        {/* Service Management Routes */}
        <Route path="services" element={<ExpertServicePage />}>
          <Route index element={<Navigate to="1-to-1" replace />} />
          <Route path="1-to-1" element={<OnetoOneCallServicePage />} />
          <Route path="dm" element={<PriorityDmServicePage />} />
          <Route path="webinar" element={<WebinarServicePage />} />
          <Route path="update/:serviceId" element={<UpdateServicePage />} />
        </Route>

        {/* Service Creation Routes */}
        <Route path="create/service" element={<CreateServicePage />}>
          <Route index element={<Navigate to="1-to-1" replace />} />
          <Route path="1-to-1" element={<CreateOneToOnepage />} />
          <Route path="dm" element={<CreateDmPage />} />
          <Route path="webinar" element={<CreateWebinarPage />} />
        </Route>

        <Route path="create-service" element={<CreateServciePage />} />
        <Route path="analytics" element={<ExpertAnalyticsPage />} />
        <Route path="testimonials" element={<ExpertTestimonialsPage />} />

        {/* Booking Routes */}
        <Route path="bookings" element={<ExpertBookingPage />}>
          <Route index element={<Navigate to="upcoming" replace />} />
          <Route path="upcoming" element={<ExpertUpcomingBooking />} />
          <Route path="completed" element={<ExpertCompletedBooking />} />
        </Route>

        <Route path="payments" element={<ExpertPaymentsPage />} />

        {/* Priority DM Routes */}
        <Route path="priority-dm" element={<ExpertPriorityDm />}>
          <Route index element={<Navigate to="pending" replace />} />
          <Route path="pending" element={<SeekerPendingMessages />} />
          <Route path="answered-by-expert" element={<ExpertAnsweredSeeker />} />
        </Route>

        <Route path="settings" element={<ExpertSettingPage />} />
        <Route path="page/:userId" element={<ExpertLeadPage />} />

        {/* Availability Routes */}
        <Route path="availability" element={<ExpertAvailabilityPage />}>
          <Route index element={<Navigate to="calendar" replace />} />
          <Route path="calendar" element={<ExpertCalendarPage />} />
          <Route path="schedule" element={<ExpertSchedulePage />} />
        </Route>

        <Route path="profile/:id" element={<ExpertProfile />} />
        <Route path="messages" element={<ExpertMessagePage />} />
      </Route>
    </React.Fragment>
  );
};

export default ExpertRoutes;
