import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";
import Footer from "./Footer";

const Layout = () => {
  const { pathname } = useLocation();

  // Define route conditions
  const isSupplierDashboard = pathname === "/supplier/dashboard";
  const isProfilePage = pathname === "/profile";
  const isSupplierRoute = pathname.startsWith("/supplier");
  const isVerificationPage = pathname === "/verify-email";
  const isAuthenticationPage = pathname === "/user/authenticate";
  const isForgotPasswordPage = pathname === "/forgot-password";
  const deleteAccountPage = pathname === "/delete";

  return (
    <div>
      {/* Show Header only when not on specific pages */}
      {!isSupplierDashboard &&
        !isSupplierRoute &&
        !isVerificationPage &&
        !isForgotPasswordPage &&
        !deleteAccountPage && <Header />}

      <Toaster />
      <Outlet />

      {/* Show Footer only when not on specific pages */}
      {!isProfilePage &&
        !isSupplierDashboard &&
        !isSupplierRoute &&
        !isAuthenticationPage &&
        !deleteAccountPage &&
        !isVerificationPage && <Footer />}
    </div>
  );
};

export default Layout;
