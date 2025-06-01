import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "./redux/features/authThunk";

import LoadingSpinner from "./components/common/LoadingSpinner";
import ScrollToTop from "./components/common/ScrollToTop";
import { Slide, ToastContainer } from "react-toastify";

// Import route configurations
import PublicRoutes from "./routes/PublicRoutes";
import SeekerRoutes from "./routes/SeekerRoutes";
import ExpertRoutes from "./routes/ExpertRoutes";

const App = () => {
  const dispatch = useDispatch();
  const { user, isCheckAuth } = useSelector((state) => state.auth);

  useEffect(() => {
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
        {PublicRoutes({ user })}
        {SeekerRoutes({ user })}
        {ExpertRoutes({ user })}
      </Routes>
    </BrowserRouter>
  );
};

export default App;