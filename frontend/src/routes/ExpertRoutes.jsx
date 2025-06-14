import React from "react";
import { Route, Navigate } from "react-router-dom";


// Import expert pages
import ExpertHomePage from "../pages/expert/ExpertHomePage";
import ExpertServicePage from "../pages/expert/ExpertServicePage";
import ExpertAnalyticsPage from "../pages/expert/ExpertAnalyticsPage";
import ExpertTestimonialsPage from "../pages/expert/ExpertTestimonialsPage";
import ExpertPaymentsPage from "../pages/expert/ExpertPaymentsPage";
import ExpertBookingPage from "../pages/expert/ExpertBookingPage";
import ExpertUpcomingBooking from "../pages/expert/ExpertUpcomingBooking";
import ExpertCompletedBooking from "../pages/expert/ExpertCompletedBooking";
import ExpertPriorityDm from "../pages/expert/ExpertPriorityDm";
import SeekerPendingMessages from "../pages/expert/SeekerPendingMessages";
import ExpertAnsweredSeeker from "../pages/expert/ExpertAnsweredSeeker";
import ExpertSettingPage from "../pages/expert/ExpertSettingPage";
import ExpertProfile from "../pages/expert/ExpertProfile";
import OnetoOneCallServicePage from "../pages/expert/OnetoOneCallServicePage";
import PriorityDmServicePage from "../pages/expert/PriorityDmServicePage";
import WebinarServicePage from "../pages/expert/WebinarServicePage";
import CreateServciePage from "../pages/expert/CreateServicePage";
import CreateOneToOnepage from "../pages/expert/CreateOneToOnepage";
import CreateDmPage from "../pages/expert/CreateDmPage";
import CreateWebinarPage from "../pages/expert/CreateWebinarPage";
import CreateServicePage from "../pages/expert/CreateServicePage";
import ExpertMessagePage from "../pages/expert/ExpertMessagePage";
import ExpertLeadPage from "../pages/expert/ExpertLeadPage";
import UpdateServicePage from "../pages/expert/UpdateServicePage";
import ExpertSchedulePage from "../pages/expert/ExpertSchedulePage";
import ExpertCalendarPage from "../pages/expert/ExpertCalendarPage";
import ExpertAvailabilityPage from "../pages/expert/ExpertAvailabilityPage";
import PostToLinkedinPage from "@/pages/expert/PostToLinkedinPage";
import ExpertLayout from "@/components/expert/Layout/ExpertLayout";

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
