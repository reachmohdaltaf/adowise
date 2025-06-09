import React from "react";
import { Route, Navigate } from "react-router-dom";

import SeekerLayout from "../seeker/components/layout/SeekerLayout";

// Import seeker pages
import SeekerHomePage from "../seeker/pages/SeekerHomePage";
import SeekerMessagePage from "../seeker/pages/SeekerMessagePage";
import SeekerBookingPage from "../seeker/pages/SeekerBookingPage";
import SeekerWhatsNew from "../seeker/pages/SeekerWhatsNew";
import SeekerProfile from "../seeker/pages/SeekerProfile";
import SeekerUpcomingBooking from "../seeker/pages/SeekerUpcomingBooking";
import { SeekerCompletedBooking } from "../seeker/pages/SeekerCompletedBooking";
import SeekerCalendarPage from "../seeker/pages/SeekerCalendarPage";
import SeekerNotificationsPage from "../seeker/pages/SeekerNotificationsPage";
import SeekerAiSearch from "../seeker/pages/SeekerAiSearch";
import SeekerSettingPage from "../seeker/pages/SeekerSettingPage";
import SeekerRewardPage from "../seeker/pages/SeekerRewardPage";
import SeekerPriorityDm from "../seeker/pages/SeekerPriorityDm";
import SeekerSentMessages from "../seeker/pages/SeekerSentMessages";
import ExpertAnsweredMessages from "../seeker/pages/ExpertAnsweredMessages";
import SeekerMentorPage from "../seeker/pages/SeekerMentorPage";
import SeekerSearchPage from "../seeker/pages/SeekerSearchPage";
import PaymentPage from "@/seeker/pages/PaymentPage";

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
          <Route path="answered-by-experts" element={<ExpertAnsweredMessages />} />
        </Route>
      </Route>
    </React.Fragment>
  );
};

export default SeekerRoutes;