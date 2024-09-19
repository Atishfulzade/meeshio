import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { appstore, avatar, meeshoLogo, playstore } from "../assets";
import { ImHeart } from "react-icons/im";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Button } from "../components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaRegUser } from "react-icons/fa6";
import { PiShoppingCart, PiDeviceMobile } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";

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
import { HiOutlineShoppingBag } from "react-icons/hi";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { sendData } from "../utils/fetchData";

const Header = () => {
  const [user, setUser] = useState(null); // State to store user info
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const [searchInput, setSearchInput] = useState(""); // State to store
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const firstname = useSelector((state) => state.userInfo.firstname);
  const profileImage = useSelector((state) => state.userInfo.profileImage);
  const lastname = useSelector((state) => state.userInfo.lastname);
  const email = useSelector((state) => state.userInfo.email);
  const cartValue = useSelector((state) => state.userInfo.cart);
  const [isOpen, setIsOpen] = useState(false);
  const logoutUser = async () => {
    try {
      const logOut = await sendData("user/auth/logout");
      localStorage.removeItem("token");
      navigate("/");
      dispatch(setIsLoggedIn(false));

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
  return (
    <div className="w-full bg-white fixed top-0 left-0 z-30 flex flex-col ">
      <div className="flex w-full gap-3 justify-between items-center  h-14 md:h-[70px] md:border-b-2 px-3 md:px-24 md:py-2  py-2">
        <div className="flex gap-3   justify-between items-center">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <IoMenu
                onClick={() => setIsOpen(true)}
                size={24}
                className="text-slate-800 md:hidden"
              />
            </DialogTrigger>

            <DialogContent
              aria-describedby="description"
              className="fixed  z-40  left-0 top-0 h-full w-full transition-all bg-white shadow-lgduration-300"
            >
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">
                  <img src={meeshoLogo} alt="logo" className="w-20" />
                </h2>
                <DialogClose asChild>
                  <IoClose onClick={() => setIsOpen(false)} size={24} />
                </DialogClose>{" "}
              </div>
              <div className="p-4">
                <ul className="flex flex-col gap-4">
                  <li>Home</li>
                  <li>Shop</li>
                  <li>About</li>
                  <li>Contact</li>
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
                {cartValue.length < 1 ? (
                  ""
                ) : (
                  <Badge className="bg-fuchsia-200 text-fuchsia-800 h-5 w-5 text-xs flex justify-center absolute top-[-5px] right-0 lg:right-[-12px]">
                    {cartValue.length}
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}
        {ismobile && location.pathname !== "/checkout" && (
          <div className=" flex gap-6">
            <Link
              to={"/checkout"}
              variant="link"
              className="text-slate-800 font-mier-book text-[17px] font-normal justify-center items-center flex flex-col h-full"
            >
              <ImHeart size={20} fill="red" />
              Cart
            </Link>

            <Link
              to={"/checkout"}
              variant="link"
              className="text-slate-800 font-mier-book text-[17px] font-normal justify-center items-center flex flex-col h-full"
            >
              <HiMiniShoppingCart size={20} />
              Cart
            </Link>
            {cartValue.length < 1 ? (
              ""
            ) : (
              <Badge className="bg-fuchsia-200 text-fuchsia-700 md:h-5 right-0 top-1 h-4 w-4 md:w-5 text-xs flex justify-center absolute md:top-[-5px] md:right-0 lg:right-[-12px]">
                {cartValue.length}
              </Badge>
            )}
          </div>
        )}
      </div>
      {location.pathname !== "/checkout" && !ismobile && <Navbar_second />}
    </div>
  );
};

export default Header;
