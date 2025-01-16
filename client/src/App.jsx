import { Suspense, lazy, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "./redux_store/identifyMobile";
import Loader from "./component/Loader";
import { setIsLoggedIn } from "./redux_store/logInSlice";
import { setUserInfo } from "./redux_store/userInfoSlice";
import { sendData } from "./utils/fetchData";
import SupplierDashboardLayout from "./component/SupplierDashboardLayout";
import { setSupplierInfo } from "./redux_store/supplierInfoSlice";
import { SidebarProvider } from "@/components/ui/sidebar";

// Utility function for debouncing
export const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SignInForm = lazy(() => import("./component/SignInForm"));
const Layout = lazy(() => import("./component/Layout"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AuthenticatePage = lazy(() => import("./pages/AuthenticatePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const MobileHome = lazy(() => import("./component/MobileHome"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const SupplierPortal = lazy(() => import("./pages/supplierAuth"));
const SupplierRegistration = lazy(() => import("./pages/SupplierRegistration"));
const Favourite = lazy(() => import("./pages/Favourite"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const SupplierProduct = lazy(() => import("./component/SupplierProduct"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const SupplierSidebar = lazy(() => import("./component/App-sidebar"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
function App() {
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const updateIsMobile = useCallback(() => {
    const windowSize = window.innerWidth <= 768;
    dispatch(setIsMobile(windowSize));
  }, []);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        dispatch(setIsLoggedIn(false));

        return;
      }

      try {
        const response = await sendData("user/auth/validateuser", { token });

        if (response?.user) {
          dispatch(setIsLoggedIn(true));
          dispatch(setUserInfo(response.user));

          if (
            response.supplier &&
            (response.supplier.role === "supplier" ||
              response.supplier.role === "admin")
          ) {
            dispatch(setSupplierInfo(response.supplier));
            dispatch(setIsLoggedIn(true));
          }
        } else {
          dispatch(setIsLoggedIn(false));
          localStorage.removeItem("token");
          navigate("/user/authenticate");
        }
      } catch (error) {
        console.error("Error validating token", error);

        dispatch(setIsLoggedIn(false));
        localStorage.removeItem("token");

        if (response?.supplier) {
          navigate("/supplier");
        } else {
          navigate("/user/authenticate");
        }
      }
    };

    validateToken();
  }, [dispatch]);

  useEffect(() => {
    updateIsMobile();
    const debouncedResize = debounce(updateIsMobile, 200);
    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
    };
  }, [updateIsMobile]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="verify-email" element={<VerifyEmail />} />
          <Route index element={isMobile ? <MobileHome /> : <Home />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="user/authenticate" element={<AuthenticatePage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="user/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="supplier/login" element={<SignInForm />} />
          <Route path="favourite" element={<Favourite />} />
          <Route path="checkout" element={<CartPage />} />
          <Route path="category/:categoryName" element={<CategoryPage />} />
          <Route path="orders" element={<OrdersPage />} />
          {isLoggedIn ? (
            <>
              <Route
                path="supplier/dashboard"
                element={<SupplierDashboardLayout />}
              />
              <Route path="profile" element={<UserProfile />} />
            </>
          ) : (
            <Route
              path="profile"
              element={<Navigate to="/user/authenticate" />}
            />
          )}
          <Route path="delete_account" element={<SignInForm />} />
          <Route path="supplier" element={<SupplierPortal />} />
          <Route path="supplier/auth" element={<SupplierRegistration />} />
          <Route
            path="/supplier/m/*"
            element={
              <SidebarProvider>
                <SupplierSidebar />
              </SidebarProvider>
            }
          >
            <Route path="dashboard" element={<DashBoard />} />
            <Route index element={<DashBoard />} />
            <Route path="product" element={<SupplierProduct />} />
            <Route path="add-product" element={<AddProduct />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
