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
      className={
        ismobile
          ? "hidden"
          : "flex pt-32 flex-col px-10 lg:px-24  mx-auto w-full md:mt-6 overflow-hidden"
      }
    >
      <div className="flex flex-col md:px-24 gap-10 justify-center items-center ">
        <div className="flex   w-full rounded-sm overflow-hidden">
          <div className="flex flex-col w-1/2 py-4 px-3 lg:p-8 justify-between bg-slate-200 ">
            <h1 className="md:text-2xl lg:text-5xl font-mier-book font-semibold text-slate-700">
              Lowest Prices
              <br />
              Best Quality Shopping
            </h1>
            <div className="flex justify-around bg-white p-3 rounded-sm">
              <div className="flex items-center font-mier-demi lg:gap-3 leading-4 text-xs lg:text-sm  gap-1">
                <img
                  src={free_delivery_jamun}
                  alt="Free delivery icon"
                  className="w-6 h-6 lg:h-8 lg:w-8 rounded-full border"
                />
                Free
                <br />
                delivery
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center font-mier-demi leading-4 lg:gap-3 text-xs lg:text-sm  gap-1">
                <img
                  src={code_jamun}
                  alt="Cash on delivery icon"
                  className="w-6 h-6 lg:h-8 lg:w-8 rounded-full border"
                />
                Cash on
                <br />
                Delivery
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center font-mier-demi leading-4 lg:gap-3 text-xs lg:text-sm  gap-1">
                <img
                  src={easy_return_jamun}
                  alt="Easy returns icon"
                  className="w-6 h-6 lg:h-8 lg:w-8 rounded-full border"
                />
                Easy
                <br /> Returns
              </div>
            </div>
            <div className="flex items-center gap-2 bg-fuchsia-700 w-fit rounded-sm text-white font-mier-book text-xs lg:text-lg lg:py-4 lg:px-5 py-2 px-3">
              <img
                src={playstore_small}
                alt="Play Store icon"
                className="w-4 lg:w-6"
              />
              Download the Meesho App
            </div>
          </div>
          <img src={ad_banner} alt="Advertisement banner" className="w-1/2" />
        </div>
        <div className="flex  justify-center items-center w-full">
          <span className="h-[1px] w-full bg-fuchsia-700" />
          <h1 className="text-xl lg:text-4xl text-slate-700  mx-10 font-mier-bold  whitespace-nowrap">
            Top Categories to choose from
          </h1>
          <span className="h-[1px] w-full bg-fuchsia-700" />
        </div>
        <div className="relative w-full h-fit rounded-sm overflow-hidden">
          <img src={category_banner} alt="Category banner" className="w-full" />
          <div className="absolute justify-between top-16 right-3 lg:right-4 left-3 flex h-full items-baseline gap-3">
            <img
              src={categories1}
              alt="Category 1"
              className="w-64 lg:w-[27rem]"
            />
            <img src={categories2} alt="Category 2" className="w-52 lg:w-80" />
            <img
              src={categories3}
              alt="Category 3"
              className="w-52   lg:w-80"
            />
          </div>
        </div>
        <div className="relative flex w-full flex-col rounded-sm overflow-hidden">
          <img
            src={essentialBanner}
            alt="Essential products banner"
            className="w-full"
          />
          <img
            src={view_all_btn}
            alt="View all button"
            className="absolute left-10 w-32 top-40 lg:w-52 lg:top-60 lg:left-20"
          />
          <div className="absolute bottom-3 lg:bottom-10 flex right-5 top-3 items-end justify-end gap-5">
            <div className="flex flex-col ">
              <img
                src={essential1}
                alt="Essential product 1"
                className="w-36 lg:w-52"
              />
              <img src={home_decor} alt="Home decor" className="w-36 lg:w-52" />
            </div>
            <div>
              <img
                src={essential2}
                alt="Essential product 2"
                className="w-36 lg:w-52"
              />
              <img
                src={kitchen_appliences}
                alt="Kitchen appliances"
                className="w-36 lg:w-52"
              />
            </div>
            <div>
              <img
                src={essential3}
                alt="Essential product 3"
                className="w-36 lg:w-52"
              />
              <img
                src={health_care}
                alt="Health care products"
                className="w-36 lg:w-52"
              />
            </div>
          </div>
        </div>
        <div className="relative flex w-full flex-col rounded-sm overflow-hidden">
          <img src={style_banner} alt="Style products banner" />
          <img
            src={view_all_btn}
            alt="View all button"
            className="absolute left-10 w-32 top-40 lg:w-52 lg:top-60 lg:left-20"
          />
          <div className="absolute bottom-3 lg:bottom-10 flex right-5 top-3 items-end justify-end gap-5">
            <div className="flex flex-col ">
              <img
                src={style1}
                alt="Style product 1"
                className="w-36 lg:w-52"
              />
              <img
                src={assessories}
                alt="Accessories"
                className="w-36 lg:w-52"
              />
            </div>
            <div>
              <img
                src={style2}
                alt="Style product 2"
                className="w-36 lg:w-52"
              />
              <img src={footwear} alt="Footwear" className="w-36 lg:w-52" />
            </div>
            <div>
              <img
                src={style3}
                alt="Style product 3"
                className="w-36 lg:w-52"
              />
              <img
                src={electronics}
                alt="Electronics"
                className="w-36 lg:w-52"
              />
            </div>
          </div>
        </div>
        <div className="relative w-full rounded-sm overflow-hidden">
          <img src={download_banner} alt="Download banner" />
          <div className=" absolute  justify-end flex top-5 lg:top-10 flex-col items-end right-5">
            <h3 className="text-3xl lg:text-5xl font-mier-bold text-fuchsia-700">
              Become a Reseller and
            </h3>
            <h1 className="text-sm font-mier-book mt-2  lg:text-xl">
              Start your Online Business <br /> with Zero Investment
            </h1>
            <div className="flex gap-2 lg:gap-4 mt-8">
              <div className="w-32 h-12 lg:w-48 lg:h-16 bg-black rounded-md overflow-hidden p-2 ">
                <img src={playstore} alt="Play Store button" />
              </div>
              <div className="w-32 h-12 lg:w-48 lg:h-16 bg-black rounded-md overflow-hidden p-2 ">
                <img src={appstore} alt="App Store button" />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full rounded-sm overflow-hidden h-full ">
          <img src={supply_banner} alt="Supplier banner" className="w-full" />
          <div className="absolute top-8 bottom-8 flex flex-col justify-around left-6 text-white">
            <h1 className="text-xl lg:text-4xl">
              Register as a Meesho Supplier
            </h1>
            <p className="text-sm font-mier-book lg:text-xl text-slate-300">
              Sell your products to crores of customers at 0% commission
            </p>
            <div className="flex mt-4 gap-2 lg:gap-8 w-full font-mier-book">
              <div className="flex items-center gap-1 lg:text-lg text-xs">
                <MdCheckCircle fill="green" size={20} />
                Grow your Business 10x
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-1 lg:text-lg text-xs">
                <MdCheckCircle fill="green" size={20} />
                Grow your Business 10x
              </div>
              <Separator orientation="vertical" />
              <div className="flex items-center gap-1 lg:text-lg text-xs">
                <MdCheckCircle fill="green" size={20} />
                Grow your Business 10x
              </div>
            </div>
            <Button className="bg-white w-fit mt-4 lg:text-sm text-slate-900 font-mier-bold  px-3 py-3  hover:bg-slate-300">
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
