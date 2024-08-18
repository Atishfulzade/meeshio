import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Toaster />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
