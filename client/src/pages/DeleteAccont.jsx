import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "../components/ui/label";
import { deleteData, sendData } from "../utils/fetchData";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "../components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { clearUserInfo } from "../redux_store/userInfoSlice";
const DeleteAccount = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Controls delete confirmation dialog
  const isLogin = useSelector((state) => state.loggedIn.isLoggedIn);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userInfo.id);
  const email = useSelector((state) => state.userInfo.email);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: email || "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      otp: showOtp
        ? Yup.string()
            .length(6, "OTP must be 6 digits")
            .required("OTP is required")
        : Yup.string(),
    }),
    onSubmit: async (values) => {
      if (!showOtp) {
        await sendData("user/auth/send-otp", { email: values.email || email });
        toast({ title: "OTP sent", description: "OTP sent to your email" });
        setShowOtp(true);
      } else {
        try {
          const response = await sendData("user/auth/otp", {
            email: values.email || email,
            otp: values.otp,
          });

          if (response.message === "OTP verified successfully") {
            toast({
              title: "OTP Verified",
              description: "You can now proceed with account deletion.",
            });
            setShowDeleteConfirm(true); // Show delete confirmation dialog
          } else {
            toast({
              title: "Invalid OTP",
              description: "Please enter the correct OTP",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error("OTP Verification Failed:", error);
          toast({
            title: "Error",
            description: "OTP verification failed. Try again.",
            variant: "destructive",
          });
        }
      }
    },
  });

  const handleDeleteAccount = async () => {
    try {
      await deleteData("user/delete", userId);
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
      dispatch(setIsLoggedIn(false));
      dispatch(clearUserInfo());
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete account.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
        <h2 className="text-xl font-semibold text-center mb-2">
          Delete Account
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please note: Deleting your account is irreversible. Proceed carefully.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Email Input */}
          {!isLogin && !showOtp && (
            <div>
              <Label htmlFor="email">Enter Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
          )}

          {/* OTP Input */}
          {showOtp && !showDeleteConfirm && (
            <div>
              <Label htmlFor="otp">Enter OTP</Label>
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
              {formik.touched.otp && formik.errors.otp && (
                <p className="text-red-500 text-sm">{formik.errors.otp}</p>
              )}
              <Button type="submit">Verify OTP</Button>
            </div>
          )}

          {/* Delete Confirmation Dialog */}
          {showDeleteConfirm && (
            <AlertDialog
              open={showDeleteConfirm}
              onOpenChange={setShowDeleteConfirm}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. Your account and all data will
                    be permanently deleted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAccount}>
                    Delete Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {/* Initial Email Submit */}
          {!showOtp && (
            <Button type="submit">
              {isLogin ? "Send OTP" : "Submit Email"}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
