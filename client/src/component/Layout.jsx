import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import SupplierHeader from "./SupplierHeader";

const Layout = () => {
  const location = useLocation();
  return (
    <div>
      {location.pathname == "/supplier/dashboard" ? (
        <SupplierHeader />
      ) : (
        <Header />
      )}
      <Toaster />
      <Outlet />
      {location.pathname !== "/profile" ||
        ("/supplier/dashboard" && <Footer />)}
    </div>
  );
};

export default Layout;
