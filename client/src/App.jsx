import { Suspense, lazy, useEffect, useCallback } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsMobile } from "./redux_store/identifyMobile";
import Loader from "./component/Loader";

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

// Utility function for debouncing
const debounce = (func, wait) => {
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

function App() {
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const dispatch = useDispatch();
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);

  const updateIsMobile = useCallback(() => {
    const windowSize = window.innerWidth <= 768;
    dispatch(setIsMobile(windowSize));
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
          <Route index element={isMobile ? <MobileHome /> : <Home />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="user/authenticate" element={<AuthenticatePage />} />
          <Route path="user/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="supplier/login" element={<SignInForm />} />
          <Route path="checkout" element={<CartPage />} />
          <Route path="orders" element={<OrdersPage />} />
          {isLoggedIn ? (
            <>
              <Route path="supplier/dashboard" element={<DashBoard />} />
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
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
