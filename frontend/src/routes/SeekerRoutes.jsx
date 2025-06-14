import React from "react";
import { Route, Navigate } from "react-router-dom";

import SeekerLayout from "../components/seeker/layout/SeekerLayout";

// Import seeker pages
import SeekerHomePage from "../pages/seeker/SeekerHomePage";
import SeekerMessagePage from "../pages/seeker/SeekerMessagePage";
import SeekerBookingPage from "../pages/seeker/SeekerBookingPage";
import SeekerWhatsNew from "../pages/seeker/SeekerWhatsNew";
import SeekerProfile from "../pages/seeker/SeekerProfile";
import SeekerUpcomingBooking from "../pages/seeker/SeekerUpcomingBooking";
import { SeekerCompletedBooking } from "../pages/seeker/SeekerCompletedBooking";
import SeekerCalendarPage from "../pages/seeker/CalendarBookingPage";
import SeekerNotificationsPage from "../pages/seeker/SeekerNotificationsPage";
import SeekerAiSearch from "../pages/seeker/SeekerAiSearch";
import SeekerSettingPage from "../pages/seeker/SeekerSettingPage";
import SeekerRewardPage from "../pages/seeker/SeekerRewardPage";
import SeekerPriorityDm from "../pages/seeker/SeekerPriorityDm";
import SeekerSentMessages from "../pages/seeker/SeekerSentMessages";
import ExpertAnsweredMessages from "../pages/seeker/ExpertAnsweredMessages";
import SeekerMentorPage from "../pages/seeker/SeekerMentorPage";
import SeekerSearchPage from "../pages/seeker/SeekerSearchPage";
import PaymentPage from "@/pages/seeker/PaymentPage";

const SeekerRoutes = ({ user }) => {
  return (
    <React.Fragment>
      <Route
        path="/seeker/dashboard"
        element={
          user?.role === "seeker" ? (
            <SeekerLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="home" element={<SeekerHomePage />} />
        <Route path="messages" element={<SeekerMessagePage />} />
        <Route path="payment" element={<PaymentPage />} />
        

        {/* Booking Routes */}
        <Route path="bookings" element={<SeekerBookingPage />}>
          <Route index element={<Navigate to="upcoming" replace />} />
          <Route path="upcoming" element={<SeekerUpcomingBooking />} />
          <Route path="completed" element={<SeekerCompletedBooking />} />
        </Route>

        <Route path="whatsnew" element={<SeekerWhatsNew />} />
        <Route path="mentors" element={<SeekerMentorPage />} />
        <Route path="profile/:id" element={<SeekerProfile />} />
        <Route path="calendar" element={<SeekerCalendarPage />} />
        <Route path="notifications" element={<SeekerNotificationsPage />} />
        <Route path="aisearch" element={<SeekerAiSearch />} />
        <Route path="search" element={<SeekerSearchPage />} />
        <Route path="settings" element={<SeekerSettingPage />} />
        <Route path="rewards" element={<SeekerRewardPage />} />

        {/* Priority DM Routes */}
        <Route path="priority-dm" element={<SeekerPriorityDm />}>
          <Route index element={<Navigate to="sent-messages" replace />} />
          <Route path="sent-messages" element={<SeekerSentMessages />} />
          <Route
            path="answered-by-experts"
            element={<ExpertAnsweredMessages />}
          />
        </Route>
      </Route>
    </React.Fragment>
  );
};

export default SeekerRoutes;
