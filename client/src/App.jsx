import Header from "./component/Header";
import { useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { setIsMobile } from "./redux_store/identifyMobile";
import ProductPage from "./pages/ProductPage";
import SignInForm from "./component/SignInForm";
import Layout from "./component/Layout";
import ErrorPage from "./pages/ErrorPage";
import AuthenticatePage from "./pages/AuthenticatePage";
import ProfilePage from "./pages/ProfilePage";
import CategoryPage from "./pages/CategoryPage";
import DashBoard from "./pages/DashBoard";
import PaymentPage from "./pages/PaymentPage";
import CartPage from "./pages/CartPage";
import { useSelector } from "react-redux";
import MobileHome from "./component/MobileHome";
function App() {
  const dispatch = useDispatch();
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

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={isMobile ? <MobileHome /> : <Home />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="user/authenticate" element={<AuthenticatePage />} />
          <Route path="user/profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="Cart" element={<CartPage />} />
          <Route path="supplier/login" element={<SignInForm />} />
          <Route path="supplier/dashboard" element={<DashBoard />} />
          <Route path="delete_account" element={<SignInForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
