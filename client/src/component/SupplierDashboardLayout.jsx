import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SupplierSidebar from "./App-sidebar";
import { Outlet } from "react-router-dom";
const SupplierDashboardLayout = () => {
  return (
    <SidebarProvider>
      <SupplierSidebar />
      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default SupplierDashboardLayout;
