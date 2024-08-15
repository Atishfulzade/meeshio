import React, { useState } from "react";
import { signIn } from "../assets";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component in shadcn/ui
import { Link } from "react-router-dom";
import { useFormik } from "formik";

const SignInForm = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values);
      navigate("/");
    },
  });
  return (
    <div className="md:h-fit pb-3 justify-center items-center md:w-[25%] w-[90%] mt-20 rounded-md overflow-hidden bg-white border">
      <img src={signIn} alt="Sign In" className="h-[44%] w-full" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-3 mb-2 mt-6 justify-start w-full"
      >
        {isRegistering && (
          <Input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formik.fullName}
            onChange={formik.handleChange}
            className=" p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] border rounded w-full"
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formik.email}
          onChange={formik.handleChange}
          className=" p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] border rounded w-full"
        />
        <Input
          type="password"
          name="password"
          value={formik.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
          className=" p-2 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [-moz-appearance:textfield] border rounded w-full"
        />
        <Button type="submit" className="bg-fuchsia-800 hover:bg-fuchsia-900">
          {isRegistering ? "Register" : "Login"}
        </Button>
        <div>
          {isRegistering ? (
            <p>
              Already have account?&nbsp;
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 font-semibold font-mier-bold hover:text-blue-700 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              New to Meeshio?&nbsp;
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 font-semibold font-mier-bold hover:text-blue-700 cursor-pointer"
              >
                Register here
              </span>
            </p>
          )}
          {!isRegistering && (
            <Link className="text-blue-600 font-semibold font-mier-bold hover:text-blue-700 cursor-pointer">
              Forgot password
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
