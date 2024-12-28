import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { sendData } from "../utils/fetchData";
import { useToast } from "../components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { setUserInfo } from "../redux_store/userInfoSlice";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { setSupplierInfo } from "../redux_store/supplierInfoSlice";

// Validation schema using Yup
const mobileValidationSchema = Yup.object({
  mobileNumber: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
});

const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const countries = [
  { name: "United States", code: "+1" },
  { name: "India", code: "+91" },
  { name: "United Kingdom", code: "+44" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
  { name: "Japan", code: "+81" },
  { name: "China", code: "+86" },
  { name: "Brazil", code: "+55" },
  { name: "South Africa", code: "+27" },
  { name: "Italy", code: "+39" },
  { name: "Mexico", code: "+52" },
  { name: "Russia", code: "+7" },
  { name: "South Korea", code: "+82" },
];

const SupplierLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      mobileNumber: "",
      countryCode: "+91",
    },
    validationSchema: mobileValidationSchema,
    onSubmit: (values) => {
      window.sessionStorage.setItem(
        "mobile",
        `${values.countryCode}${values.mobileNumber}`
      );
      navigate("auth");
      formik.resetForm();
    },
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        const response = await sendData("supplier/login", values);
        toast({
          title: "Login Successful",
          description: "Welcome to your dashboard.",
          status: "success",
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("supplier", response.supplier?._id);
        dispatch(setIsLoggedIn(true));
        dispatch(setSupplierInfo(response?.supplier));
        navigate("/supplier/dashboard");
        setIsLoginOpen(false);
      } catch (error) {
        toast({
          title: "Login Failed",
          description: error.message || "Failed to login",
          status: "error",
        });
      }
    },
  });

  return (
    <div className="bg-pink-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Sell online to 14 Cr+ customers at 0% Commission
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Become a Meesho seller and grow your business across India
        </p>
        <p className="text-center text-pink-500 font-bold mb-8">
          Don’t have a GSTIN or Composition GSTIN? You can still sell on Meesho.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 flex space-x-2 ">
            {/* Country code select */}
            <Select
              name="countryCode"
              value={formik.values.countryCode}
              onValueChange={(value) =>
                formik.setFieldValue("countryCode", value)
              }
            >
              <SelectTrigger className="w-32 border border-gray-300 rounded-lg p-3">
                {formik.values.countryCode}
              </SelectTrigger>
              <SelectContent>
                {countries.map((country, i) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name} ({country.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Mobile number input */}
            <Input
              type="text"
              name="mobileNumber"
              placeholder="Enter Your Mobile Number"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.mobileNumber}
            </div>
          ) : null}

          <Button
            type="submit"
            className="w-full bg-pink-500 text-white p-3 rounded-lg"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Submitting..." : "Start Selling"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?
            <Button
              variant="link"
              className="text-pink-500 ml-1"
              onClick={() => setIsLoginOpen(true)}
            >
              Login
            </Button>
          </p>
        </div>
      </div>

      {/* Login Dialog */}
      <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <DialogTrigger asChild>
          <span />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Log in to your account for full access
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={loginFormik.handleSubmit}>
            <div className="mb-4">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {loginFormik.touched.email && loginFormik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">
                  {loginFormik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {loginFormik.touched.password && loginFormik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">
                  {loginFormik.errors.password}
                </div>
              ) : null}
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-pink-500 text-white p-3 rounded-lg w-full"
                disabled={loginFormik.isSubmitting}
              >
                {loginFormik.isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </DialogFooter>
          </form>
          <p className="mt-4">
            Forgot password?{" "}
            <Link to="/forgot-password" className="text-pink-500">
              Click here
            </Link>
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupplierLogin;
