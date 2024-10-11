import React, { useEffect, useState } from "react";
import { IoClose, IoMenu, IoLogOutOutline } from "react-icons/io5";
import { appstore, avatar, meeshoLogo, playstore } from "../assets";
import { ImHeart } from "react-icons/im";
import { HiMiniShoppingCart, HiOutlineShoppingBag } from "react-icons/hi2";
import { Button } from "../components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCart, PiDeviceMobile } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import Navbar_second from "./Navbar_second";
import SearchBar from "./SearchBar";
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { useToast } from "@/components/ui/use-toast";
import { getData, sendData, updateData } from "../utils/fetchData";
import { clearUserInfo } from "../redux_store/userInfoSlice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../components/ui/dialog";

const Header = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const [searchInput, setSearchInput] = useState(""); // State to store search input
  const [cart, setCart] = useState([]);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const token = localStorage.getItem("token");
  const firstname = useSelector((state) => state.userInfo.firstname);
  const profileImage = useSelector((state) => state.userInfo.profileImage);
  const lastname = useSelector((state) => state.userInfo.lastname);
  const email = useSelector((state) => state.userInfo.email);
  const id = useSelector((state) => state.userInfo.id);
  const localCart = sessionStorage.getItem("cart");

  const logoutUser = async () => {
    try {
      const logOut = await sendData("user/auth/logout");
      localStorage.removeItem("token");
      dispatch(clearUserInfo());
      dispatch(setIsLoggedIn(false));
      navigate("/");

      return toast({
        title: logOut?.message || "Logged Out",
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

  const updateServerCart = async () => {
    try {
      const parsedLocalCart = JSON.parse(localCart) || [];

      const cartData = parsedLocalCart.map((item) => ({
        itemId: item.id,
        quantity: item.quantity,
      }));

      if (cartData.length > 0) {
        await updateData(`cart`, cartData);
      }
    } catch (error) {
      console.log("Error updating server cart:", error.message);
    }
  };

  const fetchCartFromServer = async () => {
    try {
      const response = await getData(`cart`);
      setCart(response);
    } catch (error) {
      console.log("Error fetching server cart:", error.message);
    }
  };

  const mergeCarts = async () => {
    try {
      const localCart = JSON.parse(sessionStorage.getItem("cart")) || [];
      const serverCart = await getData(`cart`);
      console.log(serverCart);

      const mergedCartMap = new Map();

      localCart.forEach((item) => {
        mergedCartMap.set(item.id, { ...item });
      });

      serverCart.forEach((item) => {
        if (mergedCartMap.has(item.itemId)) {
          const mergedItem = mergedCartMap.get(item.itemId);
          mergedCartMap.set(item.itemId, {
            ...mergedItem,
            quantity: mergedItem.quantity + item.quantity,
          });
        } else {
          mergedCartMap.set(item.itemId, { ...item });
        }
      });

      const mergedCartArray = Array.from(mergedCartMap.values());

      await updateData(`cart/${id}`, mergedCartArray);
      localStorage.setItem("cart", JSON.stringify(mergedCartArray));
      setCart(mergedCartArray);
    } catch (error) {
      console.error("Error merging carts:", error.message);
    }
  };

  useEffect(() => {
    if (token && id) {
      mergeCarts(); // Merge carts only if the user is logged in
    }
  }, [token, id]);

  useEffect(() => {
    if (token && id) {
      updateServerCart();
      fetchCartFromServer();
    }
  }, [token, id]);

  return (
    <div className="w-full bg-white fixed top-0 left-0 z-10 flex flex-col ">
      <div className="flex w-full gap-3 justify-between items-center  h-14 md:h-[70px] md:border-b-2 px-3 md:px-24 md:py-2  py-2">
        <div className="flex gap-3 z-40  justify-between items-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <IoMenu
                onClick={() => setIsOpen(true)}
                size={24}
                className="text-slate-800 md:hidden"
              />
            </DialogTrigger>

            <DialogContent className="fixed  z-0  left-0 top-0 h-full w-full transition-all bg-white shadow-lg duration-1000">
              <div className="px-4 flex z-50 justify-between items-center">
                <h2 className="text-lg font-bold">
                  <img src={meeshoLogo} alt="logo" className="w-20" />
                </h2>
                <DialogClose asChild>
                  <IoClose onClick={() => setIsOpen(false)} size={24} />
                </DialogClose>
              </div>
              <div className="flex justify-between px-5">
                <DialogDescription className="flex flex-col">
                  <p>Welcome {isLoggedIn ? firstname : "User"}!</p>
                  {isLoggedIn && (
                    <div className="flex gap-3 mt-3">
                      <img
                        src={profileImage}
                        alt={firstname}
                        className="h-7 w-7  rounded-full border border-fuchsia-700"
                      />
                      <p className="font-mier-book text-sm">
                        {firstname} {lastname}
                      </p>
                    </div>
                  )}
                </DialogDescription>
                <Button
                  onClick={
                    isLoggedIn
                      ? logoutUser
                      : () => {
                          navigate("/user/authenticate");
                          setIsOpen(false);
                        }
                  }
                  className="bg-fuchsia-600 hover:bg-fuchsia-700"
                >
                  {isLoggedIn ? "Logout" : "Login"}
                </Button>
              </div>
              <div className="p-4">
                <ul className="flex flex-col gap-4">
                  <Link
                    variant="link"
                    to={"/supplier"}
                    className="text-slate-800 text-[17px] font-normal font-mier-book"
                  >
                    Become a supplier
                  </Link>
                  <Link
                    variant="link"
                    to={"/supplier"}
                    className="text-slate-800 text-[17px] font-normal font-mier-book"
                  >
                    Newsroom
                  </Link>
                </ul>
              </div>
            </DialogContent>
          </Dialog>
          <img
            src={meeshoLogo}
            alt="Meesho logo"
            className="w-24 mb-1 lg:w-[165px] md:w-60"
          />
        </div>
        {!ismobile && location.pathname !== "/checkout" && (
          <SearchBar
            width={"w-96"}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        )}

        {location.pathname !== "/checkout" && (
          <div
            className={` items-center h-full justify-between ${
              ismobile ? "hidden" : "flex"
            } gap-4`}
          >
            <div className="flex h-full items-center">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className="text-slate-800 text-[17px] decoration-2 font-normal font-mier-book  underline-offset-[29px]  "
                  >
                    <PiDeviceMobile className="mr-2 font-mier-book" size={22} />
                    Download App
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit mt-3">
                  <div className="flex justify-between flex-col gap-3 space-x-3">
                    <h4 className="text-lg font-semibold text-left font-mier-bold">
                      Download from
                    </h4>
                    <div className="w-48 overflow-hidden rounded-lg p-2 bg-black h-fit">
                      <img
                        src={playstore}
                        alt="Playstore"
                        className="w-full rounded-lg cursor-pointer"
                      />
                    </div>
                    <div className="w-48 overflow-hidden rounded-lg p-2 bg-black h-fit">
                      <img
                        src={appstore}
                        alt="apple store"
                        className="w-full rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <Separator orientation="vertical" />

            <Link
              variant="link"
              to={"/supplier"}
              className="text-slate-800 text-[17px] font-normal font-mier-book"
            >
              Become a supplier
            </Link>
            <Separator orientation="vertical" />
            <Link
              variant="link"
              className="md:hidden lg:block text-slate-800 text-[17px] font-normal font-mier-book"
            >
              Newsroom
            </Link>
            <Separator orientation="vertical" className="md:hidden lg:block" />

            {location.pathname !== "/user/authenticate" && (
              <div className="flex justify-between w-32 relative items-center h-full ">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <Button
                      variant="link"
                      className="text-slate-800 decoration-2 underline-offset-[20px] font-normal justify-center items-center flex flex-col h-full"
                    >
                      <FaRegUser size={24} />
                      <p className="text-[17px] font-mier-book">Profile</p>
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit mt-[5px]">
                    <div className="flex relative justify-between flex-col space-x-3 gap-1 ">
                      {isLoggedIn ? (
                        <div className="flex flex-col">
                          <h4 className="text-lg font-semibold text-left">
                            Hello, {firstname}
                          </h4>
                          <div className="flex gap-1 font-medium items-center">
                            <img
                              src={profileImage || avatar}
                              alt="User Avatar"
                              className="h-10 w-10 border cursor-pointer rounded-full"
                              onClick={() =>
                                isLoggedIn ? navigate("/profile") : ""
                              }
                            />
                            <div className="flex flex-col">
                              <h3>{firstname + " " + lastname}</h3>
                              <h5 className="text-xs">{email}</h5>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <h4 className="text-lg font-semibold text-left">
                            Hello, User
                          </h4>
                          <p className="text-sm my-2">
                            To access your Meesho account
                          </p>
                          {!isLoggedIn && (
                            <Button
                              onClick={() => navigate("/user/authenticate")}
                              className="py-5 text-[16px] bg-fuchsia-600 hover:bg-fuchsia-700"
                            >
                              Sign up
                            </Button>
                          )}
                        </div>
                      )}
                      <Separator variant="horizantal" className="my-2" />
                      <Link className="flex gap-3 items-center h-10 text-[18px]">
                        <HiOutlineShoppingBag /> My orders
                      </Link>
                      <Separator variant="horizantal" />
                      <Link className="flex gap-3 items-center h-10 text-[18px]">
                        Delete account
                      </Link>
                      <Separator variant="horizantal" />
                      {isLoggedIn ? (
                        <p
                          className="flex gap-3 items-center cursor-pointer h-10 text-[18px]"
                          onClick={logoutUser}
                        >
                          <IoLogOutOutline size={22} /> Log Out
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <Link
                  to={"/checkout"}
                  variant="link"
                  className="text-slate-800 font-mier-book text-[17px] font-normal justify-center items-center flex flex-col h-full"
                >
                  <PiShoppingCart size={20} />
                  Cart
                </Link>
                {cart.length < 1 ? (
                  ""
                ) : (
                  <Badge className="bg-fuchsia-200 text-fuchsia-800 h-5 w-5 text-xs flex justify-center absolute top-[-5px] right-0 lg:right-[-12px]">
                    {cart.length}
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}
        {ismobile &&
          location.pathname !== "/user/authenticate" &&
          "/checkout" && (
            <div className=" flex gap-6">
              <Link
                to={"/checkout"}
                variant="link"
                className="text-slate-800 font-mier-book text-[17px] font-normal justify-center items-center flex flex-col h-full"
              >
                <ImHeart size={20} fill="red" />
              </Link>

              <Link
                to={"/checkout"}
                variant="link"
                className="text-slate-800 font-mier-book text-[17px] font-normal justify-center items-center flex flex-col h-full"
              >
                <HiMiniShoppingCart size={20} />
              </Link>
              {(cart && cart.length > 0) ||
              (localCart && JSON.parse(localCart).length > 0) ? (
                <Badge className="bg-fuchsia-200 text-fuchsia-800 h-5 w-5 text-xs flex justify-center absolute top-[-5px] right-0 lg:right-[-12px]">
                  {cartValue.length > 0
                    ? cartValue.length
                    : JSON.parse(localCart).length}
                </Badge>
              ) : (
                ""
              )}
            </div>
          )}
      </div>
      {location.pathname !== "/checkout" && !ismobile && <Navbar_second />}
    </div>
  );
};

export default Header;
