import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { BsGoogle, BsLinkedin } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { signupUser } from "@/redux/features/authThunk";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // @step Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };

  return (
    <div className="flex flex-col gap-6 items-center py-20 h-screen px-4">
      <h1 className="text-2xl text-center">Sign up. It's free!</h1>
      <form
        onSubmit={handleSubmit}
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
          name="email"
          onChange={handleChange}
          value={formData.email}
          type="email"
          placeholder="Email"
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

        <div className="w-full">
          <Button variant={'colored'} className="h-12 w-full">Sign up</Button>

          <div className="flex items-start gap-2 mt-3 text-sm">
            <Checkbox id="agree" />
            <label
              htmlFor="agree"
              className="text-muted-foreground cursor-pointer leading-snug"
            >
              I accept the terms & privacy policy
            </label>
          </div>
        </div>

        <p className="text-destructive font-normal text-center text-sm">
          or Sign up with
        </p>

        <Button
          variant="outline"
          className="h-10 w-full flex items-center justify-center gap-2"
        >
          <BsGoogle /> <p>Google</p>
        </Button>
        <Button
          variant="outline"
          className="h-10 w-full flex items-center justify-center gap-2"
        >
          <BsLinkedin /> <p>LinkedIn</p>
        </Button>
      </form>

      <p className="text-destructive text-sm text-center">
        Already have an account?{" "}
        <span className="text-foreground cursor-pointer">Log In</span>
      </p>
    </div>
  );
};

export default RegisterPage;
