import React, { useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import Navbar_second from "./Navbar_second";
import SearchBar from "./SearchBar";
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useToast } from "@/components/ui/use-toast";
import { HiOutlineShoppingBag } from "react-icons/hi";

const Header = () => {
  const [user, setUser] = useState(null); // State to store user info
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const cartValue = useSelector((state) => state.userInfo.cart);

  // Fetch user details from Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          email: currentUser.email,
        });
        dispatch(setIsLoggedIn(true));
      } else {
        setUser(null);
        dispatch(setIsLoggedIn(false));
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, [dispatch]);

  const userSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setIsLoggedIn(false));
      setUser(null);
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
        variant: "success",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Sign Out Failed",
        description: "Failed to sign out. Please try again.",
        variant: "error",
      });
    }
  };

  return (
    <div className="w-full bg-white fixed top-0 left-0 z-30 flex flex-col ">
      <div className="flex w-full gap-3 justify-between items-center  h-14 md:h-[70px] md:border-b-2 px-3 md:px-24 md:py-2  py-2">
        <div className="flex gap-3   justify-between items-center">
          <IoMenu size={24} className="text-slate-800 md:hidden" />
          <img
            src={meeshoLogo}
            alt="Meesho logo"
            className="w-24 mb-1 md:w-[165px]"
          />
        </div>
        {!ismobile && location.pathname !== "/checkout" && (
          <SearchBar width={"w-96"} />
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
              className="text-slate-800 text-[17px] font-normal font-mier-book"
            >
              Become a supplier
            </Link>
            <Separator orientation="vertical" />
            <Link
              variant="link"
              className="text-slate-800 text-[17px] font-normal font-mier-book"
            >
              Newsroom
            </Link>
            <Separator orientation="vertical" />

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
                      {user ? (
                        <div className="flex flex-col">
                          <h4 className="text-lg font-semibold text-left">
                            Hello, {user.displayName}
                          </h4>
                          <div className="flex gap-1 font-medium items-center">
                            <img
                              src={user.photoURL || avatar}
                              alt="User Avatar"
                              className="h-10 w-10 border rounded-full"
                            />
                            <h5 className="text-sm">
                              {user.displayName || user.email}
                            </h5>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <h4 className="text-lg font-semibold text-left">
                            Hello, user
                          </h4>
                          <p className="text-sm my-2">
                            To access your Meesho account
                          </p>
                          <Button
                            onClick={() => navigate("/user/authenticate")}
                            className="py-5 text-[16px] bg-fuchsia-600 hover:bg-fuchsia-700"
                          >
                            Sign up
                          </Button>
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
                      {user ? (
                        <Link
                          className="flex gap-3 items-center h-10 text-[18px]"
                          to={"/"}
                          onClick={userSignOut}
                        >
                          Log Out
                        </Link>
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
                  <Badge className="bg-fuchsia-600 text-white text-xs absolute top-[0px] right-0">
                    {cartValue.length}
                  </Badge>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <Navbar_second />
    </div>
  );
};

export default Header;
