import React from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/ui/button";
import { sendData } from "../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
const ResetPassword = ({ email, otp }) => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
    }),
    onSubmit: async (values) => {
      try {
        await sendData("user/auth/reset-password", {
          email,
          newPassword: values.password,
          otp,
        });
        toast({
          title: "Password Reset Successful",
          description: "Your password has been reset successfully.",
          appearance: "success",
        });
        navigate("/user/authenticate");
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          appearance: "error",
        });
      }
    },
  });
  return (
    <div className="absolute h-full bg-white/45 backdrop-blur w-full flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white z-50 p-8 rounded-lg flex justify-center  flex-col w-2/6 border"
      >
        <h1 className="font-mier-bold text-2xl text-center">
          Confirm Password
        </h1>
        <div className="my-5">
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={formik.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border focus:border-primary"
          />
        </div>
        <div className="mb-5">
          <Label>Confirm password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formik.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="border focus:border-primary"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>
        <Button type="submit">Change password</Button>
      </form>
    </div>
  );
};

export default ResetPassword;
