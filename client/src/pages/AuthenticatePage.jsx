import React from "react";
import SignInForm from "../component/SignInForm";
import { useLocation } from "react-router-dom";

const AuthenticatePage = () => {
  const location = useLocation();

  return (
    <div
      className="flex justify-center items-center h-screen w-full bg-white"
      style={{
        backgroundImage: "url('./assets/bg.svg')",
        backgroundSize: "cover",
        backdropFilter: "blur(10px)",
      }}
    >
      <SignInForm />
    </div>
  );
};

export default AuthenticatePage;
