import React, { useState } from "react";
import { signIn } from "../assets";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { saveUserData, fetchUserData } from "../utils/firestoreData";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux_store/userInfoSlice";
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        if (isRegistering) {
          // Register user and save user data to Firestore
          const { user } = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          const userData = {
            uid: user.uid,
            fullName: values.fullName,
            email: values.email,
          };

          await saveUserData(user.uid, userData);

          // Update Redux store
          dispatch(setUserInfo(userData));
          dispatch(setIsLoggedIn(true));

          toast({
            title: "Registration Successful",
            description: "You have been successfully registered.",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          });

          navigate("/");
        } else {
          // Login user and fetch user data from Firestore
          const { user } = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );

          const userData = await fetchUserData(user.uid);

          if (userData) {
            // Only update Redux store if userData is valid
            dispatch(setUserInfo(userData));
            dispatch(setIsLoggedIn(true));

            toast({
              title: "Login Successful",
              description: "You have successfully logged in.",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
            });

            navigate("/");
          } else {
            setErrorMessage("User data not found.");
          }
        }
      } catch (error) {
        setErrorMessage(error.message);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    },
  });

  return (
    <div className="md:h-fit pb-3 justify-center items-center md:w-[25%] w-[90%] mt-20 rounded-md overflow-hidden bg-white border">
      <img src={signIn} alt="Sign In" className="h-[44%] w-full" />
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-3 mb-2 mt-6 justify-start w-full"
      >
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
        {isRegistering && (
          <Input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            className="p-2 border rounded w-full"
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="p-2 border rounded w-full"
        />
        <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
          className="p-2 border rounded w-full"
        />
        <Button type="submit" className="bg-fuchsia-800 hover:bg-fuchsia-900">
          {isRegistering ? "Register" : "Login"}
        </Button>
        <div>
          {isRegistering ? (
            <p>
              Already have an account?&nbsp;
              <span
                onClick={() => setIsRegistering(false)}
                className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>
              New to Meeshio?&nbsp;
              <span
                onClick={() => setIsRegistering(true)}
                className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
              >
                Register here
              </span>
            </p>
          )}
          {!isRegistering && (
            <Link
              to="/forgot-password"
              className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer"
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
