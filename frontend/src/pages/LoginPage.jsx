import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/redux/features/authThunk";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BsGoogle, BsLinkedin } from "react-icons/bs";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex  flex-col gap-6 items-center pt-16 h-screen px-4">
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
            variant={'colored'}
          >
            {loading ? (
              //text with loader please wait text change
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-black"></span>
                <p>Please wait...</p>
              </>
            ) : (
              <>
                <p>Log in</p>
              </>
            )}
          </Button>
          {loading && (
            <p className="w-full flex px-1 mt-2 cursor-pointer text-destructive justify-end text-sm">
              Please wait...
            </p>
          )}
          <p className="w-full flex px-1 mt-2 cursor-pointer text-destructive justify-end text-sm">
            Forgot Password?
          </p>
        </div>

        <p className="text-destructive font-normal text-center text-sm">
          or log in with
        </p>

        <Button variant="outline" className="h-10 w-full flex items-center justify-center gap-2">
         <img src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw" alt="" className="w-5" /> <p>Continue with Google</p>
        </Button>
        <Button variant="outline" className="h-10 w-full flex items-center justify-center gap-2">
          <BsLinkedin /> <p>LinkedIn</p>
        </Button>

        {/* Error message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {typeof error === 'string' ? error : error?.message || 'An error occurred.'}
          </p>
        )}
      </form>

      <p className="text-destructive py-10 text-sm text-center">
        Don't have an account?{" "}
        <span className="text-foreground cursor-pointer">Sign Up</span>
      </p>
    </div>
  );
};

export default LoginPage;
