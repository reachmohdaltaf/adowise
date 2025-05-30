import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./redux/features/authThunk"; // Assuming authCheck is being used here

import SeekerLayout from "./seeker/components/layout/SeekerLayout";
import ExpertLayout from "./expert/components/Layout/ExpertLayout";

// Import your pages...
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import SeekerHomePage from "./seeker/pages/SeekerHomePage";
import SeekerMessagePage from "./seeker/pages/SeekerMessagePage";
import SeekerBookingPage from "./seeker/pages/SeekerBookingPage";
import SeekerWhatsNew from "./seeker/pages/SeekerWhatsNew";
import SeekerProfile from "./seeker/pages/SeekerProfile";
import SeekerUpcomingBooking from "./seeker/pages/SeekerUpcomingBooking";
import { SeekerCompletedBooking } from "./seeker/pages/SeekerCompletedBooking";
import SeekerCalendarPage from "./seeker/pages/SeekerCalendarPage";
import SeekerNotificationsPage from "./seeker/pages/SeekerNotificationsPage";
import SeekerAiSearch from "./seeker/pages/SeekerAiSearch";
import SeekerSettingPage from "./seeker/pages/SeekerSettingPage";
import SeekerRewardPage from "./seeker/pages/SeekerRewardPage";
import SeekerPriorityDm from "./seeker/pages/SeekerPriorityDm";
import SeekerSentMessages from "./seeker/pages/SeekerSentMessages";
import ExpertAnsweredMessages from "./seeker/pages/ExpertAnsweredMessages";

import ExpertHomePage from "./expert/pages/ExpertHomePage";
import ExpertServicePage from "./expert/pages/ExpertServicePage";
import ExpertAnalyticsPage from "./expert/pages/ExpertAnalyticsPage";
import ExpertTestimonialsPage from "./expert/pages/ExpertTestimonialsPage";
import ExpertPaymentsPage from "./expert/pages/ExpertPaymentsPage";
import ExpertBookingPage from "./expert/pages/ExpertBookingPage";
import ExpertUpcomingBooking from "./expert/pages/ExpertUpcomingBooking";
import ExpertCompletedBooking from "./expert/pages/ExpertCompletedBooking";
import ExpertPriorityDm from "./expert/pages/ExpertPriorityDm";
import SeekerPendingMessages from "./expert/pages/SeekerPendingMessages";
import ExpertAnsweredSeeker from "./expert/pages/ExpertAnsweredSeeker";
import ExpertSettingPage from "./expert/pages/ExpertSettingPage";
import ExpertProfile from "./expert/pages/ExpertProfile";

import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollToTop";
import { Bounce, Slide, ToastContainer } from "react-toastify";
import OnetoOneCallServicePage from "./expert/pages/OnetoOneCallServicePage";
import PriorityDmServicePage from "./expert/pages/PriorityDmServicePage";
import WebinarServicePage from "./expert/pages/WebinarServicePage";
import CreateServciePage from "./expert/pages/CreateServicePage";
import CreateOneToOnepage from "./expert/pages/CreateOneToOnepage";
import CreateDmPage from "./expert/pages/CreateDmPage";
import CreateWebinarPage from "./expert/pages/CreateWebinarPage";
import CreateServicePage from "./expert/pages/CreateServicePage";
import ExpertMessagePage from "./expert/pages/ExpertMessagePage";
import ExpertLeadPage from "./expert/pages/ExpertLeadPage";
import UpdateServicePage from "./expert/pages/UpdateServicePage";
import ExpertSchedulePage from "./expert/pages/ExpertSchedulePage";
import ExpertCalendarPage from "./expert/pages/ExpertCalendarPage";
import ExpertAvailabilityPage from "./expert/pages/ExpertAvailabilityPage";
import Layout from "./components/layout/Layout";
import ExpertServiceDetails from "./seeker/pages/ExpertServiceDetailPage";
import SeekerMentorPage from "./seeker/pages/SeekerMentorPage";
import SeekerChatBot from "./seeker/pages/SeekerChatBot";
import SeekerSearchPage from "./seeker/pages/SeekerSearchPage";

const App = () => {
  const dispatch = useDispatch();
  const { user, isCheckAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    // Dispatch the authCheck action to validate the user's session
    dispatch(authCheck());
  }, [dispatch]);

  // Show loading spinner while checking authentication
  if (!isCheckAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={user?.role === "seeker" ? "dark" : "light"}
        transition={Slide}
      />

      <ScrollToTop />
      <Routes>
                  <Route path="chatbot" element={<SeekerChatBot />} />

         <Route
            path=":username/service/:id"
            element={<ExpertServiceDetails />}
          />

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
            element={
              !user ? (
                <RegisterPage />
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
        </Route>

        {/* Seeker Routes */}
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
          <Route path="bookings" element={<SeekerBookingPage />}>
            <Route index element={<Navigate to="upcoming" replace />} />
            <Route path="upcoming" element={<SeekerUpcomingBooking />} />
            <Route path="completed" element={<SeekerCompletedBooking />} />
          </Route>
          <Route path="whatsnew" element={<SeekerWhatsNew/>} />
          <Route path="mentors" element={<SeekerMentorPage/>} />
          <Route path="profile/:id" element={<SeekerProfile />} />
          <Route path="calendar" element={<SeekerCalendarPage />} />
          <Route path="notifications" element={<SeekerNotificationsPage />} />
          <Route path="aisearch" element={<SeekerAiSearch />} />
          <Route path="search" element={<SeekerSearchPage />} />
          <Route path="settings" element={<SeekerSettingPage />} />
          <Route path="rewards" element={<SeekerRewardPage />} />
          <Route path="priority-dm" element={<SeekerPriorityDm />}>
            <Route index element={<Navigate to="sent-messages" replace />} />
            <Route path="sent-messages" element={<SeekerSentMessages />} />
            <Route
              path="answered-by-experts"
              element={<ExpertAnsweredMessages />}
            />
          </Route>
        </Route>

        {/* Expert Routes */}

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
          <Route path="services" element={<ExpertServicePage />}>
            <Route index element={<Navigate to="1-to-1" replace />} />
            <Route path="1-to-1" element={<OnetoOneCallServicePage />} />
            <Route path="dm" element={<PriorityDmServicePage />} />
            <Route path="webinar" element={<WebinarServicePage />} />
            <Route path="update/:serviceId" element={<UpdateServicePage />} />
          </Route>
          <Route path="create/service" element={<CreateServicePage />}>
            <Route index element={<Navigate to="1-to-1" replace />} />
            <Route path="1-to-1" element={<CreateOneToOnepage />} />
            
            <Route path="dm" element={<CreateDmPage />} />
            <Route path="webinar" element={<CreateWebinarPage />} />
          </Route>
          <Route path="create-service" element={<CreateServciePage />} />
          <Route path="analytics" element={<ExpertAnalyticsPage />} />
          <Route path="testimonials" element={<ExpertTestimonialsPage />} />
          <Route path="bookings" element={<ExpertBookingPage />}>
            <Route index element={<Navigate to="upcoming" replace />} />
            <Route path="upcoming" element={<ExpertUpcomingBooking />} />
            <Route path="completed" element={<ExpertCompletedBooking />} />
          </Route>
          <Route path="payments" element={<ExpertPaymentsPage />} />
          <Route path="priority-dm" element={<ExpertPriorityDm />}>
            <Route index element={<Navigate to="pending" replace />} />
            <Route path="pending" element={<SeekerPendingMessages />} />
            <Route
              path="answered-by-expert"
              element={<ExpertAnsweredSeeker />}
            />
          </Route>
          <Route path="settings" element={<ExpertSettingPage />} />
                  <Route path=":userId" element={<ExpertLeadPage />} />

          <Route path="availability" element={<ExpertAvailabilityPage />}>
            <Route index element={<Navigate to="calendar" replace />} />
            <Route path="calendar" element={<ExpertCalendarPage />} />
            <Route path="schedule" element={<ExpertSchedulePage />} />
          </Route>{" "}
          <Route path="profile/:id" element={<ExpertProfile />} />
          <Route path="messages" element={<ExpertMessagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
