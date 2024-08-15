import React from "react";
import SignInForm from "../component/SignInForm";
import { useLocation } from "react-router-dom";

const AuthenticatePage = () => {
  const location = useLocation();
  console.log(location);

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[url('./assets/bg.svg')] backdrop-blur bg-white fill-background">
      <SignInForm />
    </div>
  );
};

export default AuthenticatePage;
