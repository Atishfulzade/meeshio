import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Label } from "../components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { sendData } from "../utils/fetchData";
import { toast } from "../components/ui/use-toast";
import ResetPassword from "../component/ResetPassword";

const ForgotPassword = () => {
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isOTPverified, setIsOTPverified] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      if (!isOtpSend) {
        // Send OTP
        try {
          const res = await sendData("user/auth/send-otp", {
            email: values.email,
          });
          console.log(res);

          if (res.message === "OTP sent to email successfully") {
            toast({
              title: "OTP Sent",
              description: "Check your email for the OTP.",
            });
            setIsOtpSend(true);
          } else {
            toast({
              title: "Error",
              description: res.message,
              variant: "destructive",
            });
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to send OTP.",
            variant: "destructive",
          });
        }
      } else {
        // Verify OTP
        try {
          const res = await sendData("user/auth/otp", {
            email: values.email,
            otp: values.otp,
          });

          if (res.message === "OTP verified successfully") {
            toast({
              title: "OTP Verified",
              description: "You can now reset your password.",
            });
          } else {
            toast({
              title: "Invalid OTP",
              description: "Please enter a valid OTP.",
              variant: "destructive",
            });
          }
          setIsOtpSend(false);
          setIsOTPverified(true);
          formik.resetForm();
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to verify OTP.",
            variant: "destructive",
          });
        }
      }
    },
  });

  return (
    <div className="h-screen w-full flex justify-center items-center">
      {isOTPverified && (
        <ResetPassword email={formik.values.email} otp={formik.values.otp} />
      )}
      <form
        className="flex flex-col border gap-3 p-5 rounded-md w-96"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>

        {!isOtpSend && (
          <>
            <p className="text-gray-600 text-center">
              Enter your registered email to receive an OTP.
            </p>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              className="border p-2 w-full"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </>
        )}

        {isOtpSend && (
          <>
            <p className="text-center text-gray-600">
              Enter the OTP sent to your email.
            </p>
            <InputOTP
              maxLength={6}
              value={formik.values.otp}
              onChange={(value) => formik.setFieldValue("otp", value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </>
        )}

        <Button
          type="submit"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white p-2 w-full"
        >
          {isOtpSend ? "Verify OTP" : "Send OTP"}
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
