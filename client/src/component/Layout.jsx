import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import { Toaster } from "../components/ui/toaster";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
