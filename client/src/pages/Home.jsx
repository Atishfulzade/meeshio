import React from "react";
import {
  ad_banner,
  appstore,
  assessories,
  categories1,
  categories2,
  categories3,
  category_banner,
  code_jamun,
  download_banner,
  easy_return_jamun,
  electronics,
  essential1,
  essential2,
  essential3,
  essentialBanner,
  footwear,
  free_delivery_jamun,
  health_care,
  home_decor,
  kitchen_appliences,
  playstore,
  playstore_small,
  style1,
  style2,
  style3,
  style_banner,
  supply_banner,
  view_all_btn,
} from "../assets";
import { MdCheckCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import CardDisplay from "../component/CardDisplay";

const Home = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <div
      className={`${
        ismobile ? "hidden" : "flex"
      }  gap-10 flex-col px-24   overflow-hidden`}
    >
      <div className="flex  gap-10 flex-col px-24 pt-16 mt-28 ">
        <div className="flex relative w-full  bg-slate-100 rounded-md overflow-hidden">
          <div className="flex flex-col justify-between w-1/2 p-9">
            <h1 className=" whitespace-nowrap leading-tight font-mier-bold text-[44px] text-slate-700 font-semibold">
              Lowest Prices
              <br />
              Best Quality Shopping
            </h1>
            <div className="flex bg-white justify-around items-center rounded-sm w-full h-16  p-3">
              <div className="flex gap-3 leading-5 text-[15px] p-2 font-mier-bold justify-center items-center h-full">
                <img
                  src={free_delivery_jamun}
                  alt="Free delivery icon"
                  className="rounded-full h-8 w-8 overflow-hidden bg-black"
                />
                Free
                <br />
                delivery
              </div>
              <Separator orientation="vertical" />
              <div className="flex  gap-3 leading-5 text-[15px] p-2 font-mier-bold justify-center items-center h-full">
                <img
                  src={code_jamun}
                  alt="Cash on delivery icon"
                  className="rounded-full h-8 w-8 overflow-hidden bg-black"
                />
                Cash on
                <br />
                Delivery
              </div>
              <Separator orientation="vertical" />
              <div className="flex  gap-3 leading-5 text-[15px] p-2 font-mier-bold justify-center items-center h-full">
                <img
                  src={easy_return_jamun}
                  alt="Easy returns icon"
                  className="rounded-full h-8 w-8 overflow-hidden bg-black"
                />
                Easy <br /> Returns
              </div>
            </div>
            <div className="flex w-fit font-semibold hover:bg-fuchsia-900 transition-all cursor-pointer px-5 py-3 text-white font-mier-bold items-center gap-2 rounded bg-fuchsia-800">
              <img src={playstore_small} alt="Play Store icon" />
              Download the Meesho App
            </div>
          </div>
          <img src={ad_banner} alt="Advertisement banner" className="w-1/2" />
        </div>
        <div className="flex  justify-center items-center gap-6  ">
          <span className="h-[1px] w-64 bg-fuchsia-700" />
          <h1 className="font-mier-bold font-semibold text-slate-800 text-4xl whitespace-nowrap">
            Top Categories to choose from
          </h1>
          <span className="h-[1px] w-64 bg-fuchsia-700" />
        </div>
        <div className="w-fit relative">
          <img
            src={category_banner}
            alt="Category banner"
            className="rounded-sm w-full"
          />
          <div className="absolute bottom-10 mx-auto left-4 flex w-full items-end object-contain gap-5">
            <img src={categories1} alt="Category 1" className="w-full" />
            <img
              src={categories2}
              alt="Category 2"
              className="object-scale-down "
            />
            <img
              src={categories3}
              alt="Category 3"
              className="object-contain"
            />
          </div>
        </div>
        <div className="w-fit relative rounded overflow-hidden">
          <img
            src={essentialBanner}
            alt="Essential products banner"
            className="rounded-sm"
          />
          <img
            src={view_all_btn}
            alt="View all button"
            className="absolute cursor-pointer left-24 top-[50%]"
          />
          <div className="absolute bottom-12 justify-end right-14 flex w-full  gap-5">
            <div className="flex flex-col">
              <img src={essential1} alt="Essential product 1" />
              <img
                src={home_decor}
                alt="Home decor"
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <img src={essential2} alt="Essential product 2" />
              <img
                src={kitchen_appliences}
                alt="Kitchen appliances"
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <img src={essential3} alt="Essential product 3" />
              <img
                src={health_care}
                alt="Health care products"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="w-fit relative rounded-sm">
          <img
            src={style_banner}
            alt="Style products banner"
            className="rounded-sm"
          />
          <img
            src={view_all_btn}
            alt="View all button"
            className="absolute cursor-pointer left-24 top-[50%]"
          />
          <div className="absolute bottom-12 justify-end right-14 flex w-full  gap-5">
            <div className="flex flex-col">
              <img src={style1} alt="Style product 1" />
              <img
                src={assessories}
                alt="Accessories"
                className="cursor-pointer"
              />
            </div>
            <div className="flex flex-col">
              <img src={style2} alt="Style product 2" />
              <img src={footwear} alt="Footwear" className="cursor-pointer" />
            </div>
            <div className="flex flex-col">
              <img src={style3} alt="Style product 3" />
              <img
                src={electronics}
                alt="Electronics"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex relative rounded-sm">
          <img
            src={download_banner}
            alt="Download banner"
            className="rounded-sm"
          />
          <div className="flex absolute flex-col gap-8 top-10 justify-center right-10 items-end">
            <h3 className="font-mier-book text-3xl text-blue-500">
              Become a Reseller and
            </h3>
            <h1 className="font-mier-bold text-5xl font-semibold text-fuchsia-600 text-end">
              Start your Online Business <br /> with Zero Investment
            </h1>
            <div className="flex gap-2 mt-4">
              <div className="w-44 p-1 bg-black rounded-md">
                <img src={playstore} alt="Play Store button" />
              </div>
              <div className="w-44 p-1 bg-black rounded-md">
                <img
                  src={appstore}
                  alt="App Store button"
                  className="rounded-sm"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src={supply_banner}
            alt="Supplier banner"
            className="rounded-sm"
          />
          <div className="flex flex-col gap-3 absolute top-6 left-8 text-white">
            <h1 className="text-4xl font-mier-bold font-semibold">
              Register as a Meesho Supplier
            </h1>
            <p className="font-mier-book">
              Sell your products to crores of customers at 0% commission
            </p>
            <div className="flex  gap-3 justify-between items-center h-8 mt-8">
              <div className="flex items-center gap-2 font-mier-bold font-semibold">
                <MdCheckCircle fill="green" size={20} />
                Grow your Business 10x
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-2 font-mier-bold font-semibold">
                <MdCheckCircle fill="green" size={20} />
                Grow your Business 10x
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-2 font-mier-bold font-semibold">
                <MdCheckCircle fill="green" size={20} />
                Grow your Business 10x
              </div>
            </div>
            <Button className="w-fit bg-white hover:bg-slate-100 text-slate-800 font-mier-bold font-semibold mt-5">
              Sign up Now
            </Button>
          </div>
        </div>
      </div>
      <CardDisplay />
    </div>
  );
};

export default Home;
