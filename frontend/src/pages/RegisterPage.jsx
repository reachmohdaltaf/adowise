import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { BsGoogle, BsLinkedin } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp, completeSignup, authCheck } from "@/redux/features/authThunk";
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
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: complete signup
  const [loading, setLoading] = useState(false);

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
      setStep(2); // Move to OTP verification step
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
      setStep(3); // Move to complete signup step
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
    // 1. Complete registration
    const user = await dispatch(completeSignup(formData)).unwrap();
    
    // 2. Verify auth status (since we're using cookies)
    await dispatch(authCheck()).unwrap();
    
    // 3. Navigate based on role
    navigate(
      user.role === 'seeker' 
        ? '/seeker/dashboard/home' 
        : '/expert/dashboard/home'
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

  return (
    <div className="flex flex-col gap-6 items-center pt-16 h-screen max-w-md mx-auto px-4">
      <h1 className="text-2xl pt-14 text-center">Sign up. It's free!</h1>
      
      {step === 1 && (
        <form onSubmit={handleSendOtp} className="flex flex-col gap-4 w-full max-w-92">
          <Input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            placeholder="Email"
            className="h-12 placeholder:text-destructive w-full"
          />

          <Button
            variant="colored"
            className="h-12 w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4 w-full max-w-92">
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
              variant="colored"
              type="submit"
              className="h-12"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
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
        <form onSubmit={handleCompleteSignup} className="flex flex-col gap-4 w-full max-w-92">
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
            variant="colored"
            className="h-12 w-full flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Complete Signup"}
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

      {step === 1 && (
        <>
          <p className="text-destructive font-normal text-center text-sm">
            or Sign up with
          </p>

          <Button
            variant="outline"
            className="h-10 w-full  flex items-center justify-center gap-2"
          >
            <BsGoogle /> <p>Google</p>
          </Button>
          <Button
            variant="outline"
            className="h-10 1/2 w-full items-center justify-center gap-2"
          >
            <BsLinkedin /> <p>LinkedIn</p>
          </Button>
        </>
      )}

      <p className="text-destructive text-sm py-10 text-center">
        Already have an account?{" "}
        <span className="text-foreground cursor-pointer">Log In</span>
      </p>
    </div>
  );
};

export default RegisterPage;