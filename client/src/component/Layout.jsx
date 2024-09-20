import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import SupplierHeader from "./SupplierHeader";

const Layout = () => {
  const location = useLocation();

  // Check if the current path matches specific routes
  const isSupplierDashboard = location.pathname === "/supplier/dashboard";
  const isProfile = location.pathname === "/profile";

  return (
    <div>
      {isSupplierDashboard || location.pathname.startsWith("/supplier") ? (
        <SupplierHeader />
      ) : (
        <Header />
      )}
      <Toaster />
      <Outlet />
      {!isProfile && !isSupplierDashboard && <Footer />}
    </div>
  );
};

export default Layout;
