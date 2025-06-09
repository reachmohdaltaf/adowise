import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect, useRef } from "react";
import { BsLinkedin } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  sendOtp,
  verifyOtp,
  completeSignup,
  authCheck,
  googleSignup,
} from "@/redux/features/authThunk";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const googleButtonRef = useRef(null);

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.getElementById("google-identity-script")) {
        return Promise.resolve();
      }
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.id = "google-identity-script";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    loadGoogleScript()
      .then(() => {
        if (window.google && window.google.accounts) {
          window.google.accounts.id.initialize({
            client_id:
              "321442003050-hj99g82b6e839ktec8vvuv4hu1qhjstr.apps.googleusercontent.com",
            callback: handleGoogleSignup,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          if (googleButtonRef.current) {
            window.google.accounts.id.renderButton(googleButtonRef.current, {
              theme: "outline",
              size: "large",
              type: "standard",
              text: "signup_with",
            });
          }
        }
      })
      .catch((error) => {
        console.error("Failed to load Google Identity Services:", error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Email is required");
      return;
    }

    setLoading(true);
    try {
      await dispatch(sendOtp(formData.email)).unwrap();
      toast.success("OTP sent to your email");
      setStep(2);
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      await dispatch(verifyOtp({ email: formData.email, otp })).unwrap();
      toast.success("OTP verified successfully");
      setStep(3);
    } catch (error) {
      toast.error(error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await dispatch(completeSignup(formData)).unwrap();
      await dispatch(authCheck()).unwrap();

      toast.success("Account created successfully!");
      navigate(
        result.user.role === "seeker"
          ? "/seeker/dashboard/home"
          : "/expert/dashboard/home"
      );
    } catch (error) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await dispatch(sendOtp(formData.email)).unwrap();
      toast.success("New OTP sent to your email");
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async (response) => {
    if (!response.credential) {
      toast.error("Google sign-in failed. Please try again.");
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await dispatch(googleSignup(response.credential)).unwrap();
      await dispatch(authCheck()).unwrap();

      toast.success("Google signup successful!");
      navigate(
        result.user.role === "seeker"
          ? "/seeker/dashboard/home"
          : "/expert/dashboard/home"
      );
    } catch (error) {
      toast.error(error.message || "Google signup failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center pt-16 h-screen max-w-md mx-auto px-4">
      <h1 className="text-2xl pt-14 text-center">Sign up. It's free!</h1>

      {step === 1 && (
        <>
          <form
            onSubmit={handleSendOtp}
            className="flex flex-col gap-4 w-full max-w-92"
          >
            <Input
              name="email"
              onChange={handleChange}
              value={formData.email}
              type="email"
              placeholder="Email"
              className="h-12 placeholder:text-destructive w-full"
            />

            <Button
              variant="default"
              className="h-12 w-full flex items-center justify-center"
              disabled={loading}
              isLoading={loading}
            >
              Send OTP
            </Button>
          </form>

          <p className="text-destructive font-normal text-center text-sm mt-6">
            or Sign up with
          </p>

          <div
            ref={googleButtonRef}
            className="w-full  mt-2 mb-4"
          >
            {googleLoading && (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            )}
          </div>

          <Button
            variant="outline"
            className="h-10 w-full flex items-center justify-center gap-2"
            disabled={googleLoading}
          >
            <BsLinkedin /> <p>LinkedIn</p>
          </Button>
        </>
      )}

      {step === 2 && (
        <form
          onSubmit={handleVerifyOtp}
          className="flex flex-col gap-4 w-full max-w-92"
        >
          <p className="text-center text-sm">
            We've sent a 6-digit OTP to {formData.email}
          </p>

          <Input
            name="otp"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            placeholder="Enter OTP"
            className="h-12 placeholder:text-destructive w-full"
            maxLength={6}
          />

          <div className="flex justify-between w-full">
            <Button
              variant="outline"
              type="button"
              onClick={() => setStep(1)}
              className="h-12"
            >
              Back
            </Button>

            <Button
              variant="default"
              type="submit"
              className="h-12"
              disabled={loading}
              isLoading={loading}
            >
              Verify OTP
            </Button>
          </div>

          <p className="text-center text-sm">
            Didn't receive OTP?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-foreground cursor-pointer underline"
              disabled={loading}
            >
              Resend OTP
            </button>
          </p>
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={handleCompleteSignup}
          className="flex flex-col gap-4 w-full max-w-92"
        >
          <Input
            name="name"
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="Name"
            className="h-12 placeholder:text-destructive w-full"
          />

          <Input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            placeholder="Password"
            className="h-12 placeholder:text-destructive w-full"
          />

          <Button
            variant="default"
            className="h-12 w-full flex items-center justify-center"
            disabled={loading}
            isLoading={loading}
          >
            Complete Signup
          </Button>

          <div className="flex items-start gap-2 mt-3 text-sm">
            <Checkbox id="agree" />
            <label
              htmlFor="agree"
              className="text-muted-foreground cursor-pointer leading-snug"
            >
              I accept the terms & privacy policy
            </label>
          </div>
        </form>
      )}

      <p className="text-destructive text-sm py-10 text-center">
        Already have an account?{" "}
        <span
          className="text-foreground cursor-pointer hover:underline"
          onClick={() => navigate("/login")}
        >
          Log In
        </span>
      </p>
    </div>
  );
};

export default RegisterPage;
