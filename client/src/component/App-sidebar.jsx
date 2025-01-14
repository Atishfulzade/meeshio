import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronUp,
  Home,
  Inbox,
  Blocks,
  LogOut,
  Search,
  Settings,
  User,
  User2,
  Bell,
  Package,
  List,
  PackagePlus,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../components/ui/dropdown-menu";
import { meeshoLogo } from "../assets";
import { fetchSignedUrl } from "../utils/signedUrl";
import { sendData } from "../utils/fetchData";
import { toast } from "../components/ui/use-toast";
import { setIsLoggedIn } from "../redux_store/logInSlice";

const items = [
  {
    title: "Dashboard",
    url: "/supplier/m/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/supplier/m/product",
    icon: List,
  },
  {
    title: "Add Product",
    url: "/supplier/m/add-product",
    icon: PackagePlus,
  },
  {
    title: "Orders",
    url: "#",
    icon: Package,
  },
  {
    title: "Notification",
    url: "#",
    icon: Bell,
  },
];

const SupplierSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [supplierLogo, setSupplierLogo] = useState("");
  const supplier = useSelector((state) => state.supplierInfo);
  const logoutUser = async () => {
    try {
      const logOut = await sendData("supplier/logout");
      localStorage.removeItem("token");
      dispatch(setIsLoggedIn(false));
      navigate("/");

      return toast({
        title: logOut?.message,
        description: "You have been successfully logged out",
        status: "success",
      });
    } catch (error) {
      return toast({
        title: "Failed to Log Out",
        description: "An error occurred while trying to log out",
        status: "error",
      });
    }
  };

  const handleSupplierLogo = async () => {
    if (supplier.profileImage) {
      const signedUrl = await fetchSignedUrl(supplier.profileImage);
      setSupplierLogo(signedUrl);
    }
  };
  useEffect(() => {
    handleSupplierLogo();
  }, [supplier]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <img src={meeshoLogo} alt="Logo" width={80} />
              <span style={{ marginLeft: "10px", paddingTop: "10px" }}>
                {supplier.role}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu style={{ marginTop: "1.2rem" }}>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} asChild>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={({ isActive }) =>
                          isActive ? "active-class" : "inactive-class"
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    {supplier.profileImage ? (
                      <img src={supplierLogo} alt="company logo" />
                    ) : (
                      <User2 />
                    )}
                    {supplier?.companyName}
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <User
                      strokeWidth={1.25}
                      size={20}
                      style={{ marginRight: "10px" }}
                    />
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutUser}>
                    <LogOut
                      strokeWidth={1.25}
                      size={20}
                      style={{ marginRight: "10px" }}
                    />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default SupplierSidebar;
