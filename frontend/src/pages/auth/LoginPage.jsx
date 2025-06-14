import { useDispatch, useSelector } from "react-redux";
import { loginUser, googleLogin, authCheck } from "@/redux/features/authThunk";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsLinkedin } from "react-icons/bs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [googleLoading, setGoogleLoading] = useState(false);

  const googleButtonRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  const handleGoogleLoginCallback = async (response) => {
    if (!response.credential) {
      toast.error("Google sign-in failed");
      setGoogleLoading(false);
      return;
    }

    setGoogleLoading(true);
    try {
      const result = await dispatch(googleLogin(response.credential)).unwrap();
      await dispatch(authCheck()).unwrap();

      toast.success("Google login successful!");
      navigate(
        result.user.role === "seeker"
          ? "/seeker/dashboard/home"
          : "/expert/dashboard/home"
      );
    } catch (error) {
      toast.error(error.message || "Google login failed");
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    // Load Google SDK script if not already loaded
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
            callback: handleGoogleLoginCallback,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          if (googleButtonRef.current) {
            // Clear container before rendering
            googleButtonRef.current.innerHTML = "";

            window.google.accounts.id.renderButton(googleButtonRef.current, {
              theme: "outline",
              size: "large",
              type: "standard",
              text: "signin_with",
            });
          }
        }
      })
      .catch((error) => {
        console.error("Failed to load Google Identity Services:", error);
      });
  }, []); // runs once on mount

  return (
    <div className="flex flex-col gap-6 items-center pt-16 h-screen px-4">
      <h1 className="text-2xl pt-10">Log in</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-92">
        <Input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="h-12 placeholder:text-destructive w-full"
        />
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="h-12 placeholder:text-destructive w-full"
        />

        <div className="w-full">
          <Button
            type="submit"
            className="h-12 w-full flex items-center justify-center gap-2"
            disabled={loading}
            variant="colored"
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-black"></span>
                <p>Please wait...</p>
              </>
            ) : (
              <p>Log in</p>
            )}
          </Button>

          {loading && (
            <p className="w-full flex px-1 mt-2 text-destructive justify-end text-sm">
              Please wait...
            </p>
          )}
          <p className="w-full flex px-1 mt-2 text-destructive justify-end text-sm cursor-pointer">
            Forgot Password?
          </p>
        </div>

        <p className="text-destructive font-normal text-center text-sm">or log in with</p>

        {/* Google Sign-In Button will render here */}
        <div ref={googleButtonRef} className="w-full  mb-2">
  {googleLoading && (
    <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  )}
</div>


        {/* LinkedIn button (your custom button) */}
        <Button variant="outline" className="h-10 w-full flex items-center justify-center gap-2">
          <BsLinkedin /> <p>LinkedIn</p>
        </Button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {typeof error === "string" ? error : error?.message || "An error occurred."}
          </p>
        )}
      </form>

      <p className="text-destructive py-10 text-sm text-center">
        Don't have an account?{" "}
        <span
          className="text-foreground cursor-pointer hover:underline"
          onClick={() => navigate("/register")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
