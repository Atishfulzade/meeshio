import React, { useState } from "react";
import { signIn } from "../assets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux_store/userInfoSlice";
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { useToast } from "@/components/ui/use-toast";
import { sendData } from "../utils/fetchData";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    firstname: Yup.string().when("isRegistering", {
      is: true,
      then: Yup.string().required("First name is required"),
    }),
    lastname: Yup.string().when("isRegistering", {
      is: true,
      then: Yup.string().required("Last name is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      gender: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        let response;
        if (isRegistering) {
          // Registration logic
          response = await sendData("user/auth/register", values);
          if (response?.message && response?.token) {
            toast({
              title: "Registration Successful",
              description: response.message,
              appearance: "success",
            });
            localStorage.setItem("token", response?.token);
            setIsRegistering(false);
            dispatch(setIsLoggedIn(true));
            dispatch(setUserInfo(response?.user));
            navigate("/");
          } else {
            throw new Error(response.response?.data || "Registration failed");
          }
        } else {
          // Login logic
          response = await sendData("user/auth/login", {
            email: values.email,
            password: values.password,
          });
          if (response?.message && response.token) {
            dispatch(setUserInfo(response.user));
            dispatch(setIsLoggedIn(true));
            toast({
              title: "Login Successful",
              description: response.message,
              appearance: "success",
            });
            localStorage.setItem("token", response?.token);
            dispatch(setUserInfo(response?.user));
            navigate("/");
            const token = Cookies.get("yourCookieName");
          } else {
            throw new Error(
              response.response?.data?.message || "Invalid login credentials"
            );
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
          appearance: "error",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="md:h-fit  justify-center items-center md:w-80 w-[90%]  rounded-md overflow-hidden bg-white border">
      <img src={signIn} alt="Sign In" className="h-[44%] w-full" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-3 mb-2  justify-start w-full"
      >
        <h1 className="text-center font-bold font-mier-bold text-xl text-slate-500">
          {isRegistering ? "Register your Account" : "Log in your account"}
        </h1>
        {isRegistering && (
          <>
            <div className="flex gap-2">
              <div>
                <Input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-2 border rounded w-full"
                  disabled={isLoading}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="p-2 border rounded w-full"
                  disabled={isLoading}
                />
                {formik.touched.lastname && formik.errors.lastname ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastname}
                  </div>
                ) : null}
              </div>
            </div>

            <Select
              name="gender"
              value={formik.values.gender} // Bind value from Formik
              onValueChange={(value) => formik.setFieldValue("gender", value)} // Update Formik state
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select your gender</SelectLabel>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            )}
          </>
        )}

        <div>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full"
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder={
              isRegistering ? "Create a password" : "Enter your password"
            }
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded w-full"
            disabled={isLoading}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <Button
          type="submit"
          className="bg-fuchsia-800 hover:bg-fuchsia-900"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loader">Loading...</span>
          ) : isRegistering ? (
            "Register"
          ) : (
            "Login"
          )}
        </Button>
        <div>
          {isRegistering ? (
            <p>
              Already have an account?&nbsp;
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              New to Meeshio?&nbsp;
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
              >
                Register here
              </span>
            </p>
          )}
          {!isRegistering && (
            <Link
              to="/forgot-password"
              className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
            >
              Forgot password
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
