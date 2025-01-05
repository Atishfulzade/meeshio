import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";
import Footer from "./Footer";
import SupplierHeader from "./SupplierHeader";

const Layout = () => {
  const location = useLocation();

  // Check if the current path matches specific routes
  const isSupplierDashboard = location.pathname === "/supplier/dashboard";
  const isProfile = location.pathname === "/profile";
  const isSupplierPath = location.pathname.startsWith("/supplier");

  return (
    <div>
      {!isSupplierDashboard && !isSupplierPath && <Header />}
      <Toaster />
      <Outlet />
      {!isProfile && !isSupplierDashboard && !isSupplierPath && <Footer />}
    </div>
  );
};

export default Layout;
