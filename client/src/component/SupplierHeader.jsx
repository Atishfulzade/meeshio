import React, { useEffect, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { appstore, avatar, meeshoLogo, playstore } from "../assets";
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
import { setIsLoggedIn } from "../redux_store/logInSlice";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { sendData } from "../utils/fetchData";

const SupplierHeader = () => {
  const [user, setUser] = useState(null); // State to store user info
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const firstname = useSelector((state) => state.userInfo.firstname);
  const profileImage = useSelector((state) => state.userInfo.profileImage);
  const lastname = useSelector((state) => state.userInfo.lastname);
  const email = useSelector((state) => state.userInfo.email);
  const [isOpen, setIsOpen] = useState(false);

  const logoutUser = async () => {
    try {
      const logOut = await sendData("supplier/logout");
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
    <div className="w-full bg-pink-100 fixed top-0 left-0 z-30 flex flex-col">
      <div className="flex w-full gap-3 justify-between items-center h-14 md:h-[70px] md:border-b-2 px-3 md:px-24 md:py-2 py-2">
        <div className="flex gap-3 justify-between items-center">
          {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>
              <IoMenu
                onClick={() => setIsOpen(true)}
                size={24}
                className="text-slate-800 md:hidden"
              />
            </DialogTrigger>

            <DialogContent
              aria-describedby="description"
              className="fixed z-40 left-0 top-0 h-full w-full transition-all bg-white shadow-lg duration-300"
            >
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold">
                  <img src={meeshoLogo} alt="logo" className="w-20" />
                </h2>
                <DialogClose asChild>
                  <IoClose onClick={() => setIsOpen(false)} size={24} />
                </DialogClose>
              </div>
              <div className="p-4">
               
              </div>
            </DialogContent>
          </Dialog> */}
          <img
            src={meeshoLogo}
            alt="Meesho Supplier Logo"
            className="w-24 mb-1 lg:w-[100px] md:w-40"
          />
        </div>

        <div className="items-center h-full justify-between gap-4 flex">
          <div className="flex h-full items-center">
            <Button
              variant="link"
              className="text-slate-800 text-[17px] font-normal font-mier-book"
            >
              Supplier Portal
            </Button>
          </div>
          <Separator orientation="vertical" />

          {location.pathname !== "/supplier/login" && (
            <div className="flex justify-between relative items-center h-full">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button
                    variant="link"
                    className="text-slate-800  decoration-2 underline-offset-[20px] font-normal justify-center items-center flex flex-col h-full"
                  >
                    <FaRegUser size={18} />
                    {!ismobile && (
                      <p className="text-[17px] font-mier-book">Profile</p>
                    )}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit mt-[5px]">
                  <div className="flex relative flex-col space-x-3 gap-1">
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
                          Hello, Supplier
                        </h4>
                        <p className="text-sm my-2">
                          To access your supplier account
                        </p>
                        {!isLoggedIn && (
                          <Button
                            onClick={() => navigate("/supplier")}
                            className="py-5 text-[16px] bg-fuchsia-600 hover:bg-fuchsia-700"
                          >
                            Sign In
                          </Button>
                        )}
                      </div>
                    )}

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierHeader;
