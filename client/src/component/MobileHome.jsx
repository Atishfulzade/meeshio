import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { mobile_poster, product1, product2 } from "../assets";
import SearchBar from "./SearchBar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { TbArrowsSort } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import { IoClose, IoFilter } from "react-icons/io5";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import CardDisplay from "./CardDisplay";
import { deals, filterData, slide } from "../utils/constant";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

// Memoize the SearchBar component
const MemoizedSearchBar = React.memo(SearchBar);

const MobileHome = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [activeDrawer, setActiveDrawer] = useState(""); // State to store which drawer is active
  const navigate = useNavigate();
  // Memoize callback for slide change to prevent unnecessary re-renders
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  // Function to render different content in the drawer based on the activeDrawer value
  const renderDrawerContent = () => {
    switch (activeDrawer) {
      case "Sort":
        return (
          <RadioGroup defaultValue="comfortable">
            <div className="p-3 flex flex-col gap-5 mb-5">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Relevance" id="r1" />
                <Label htmlFor="r1">Relevance</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="New arrivals" id="r2" />
                <Label htmlFor="r2">New arrivals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Price(Low to high)" id="r3" />
                <Label htmlFor="r3">Price (Low to high)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Price(High to low)" id="r4" />
                <Label htmlFor="r4">Price (High to low)</Label>
              </div>
            </div>
          </RadioGroup>
        );
      case "Category":
        return (
          <div className="flex flex-col p-3 gap-5 h-96 overflow-x-auto mb-16 relative">
            {filterData.map((subData, i) => (
              <div className="flex items-center  space-x-2" key={i}>
                <Checkbox
                  id={`terms${i}`}
                  onClick={() => {
                    onFilterChange(subData.title);
                  }}
                />
                <Label
                  htmlFor={`terms${i}`}
                  className="text-sm font-mier leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {subData.title}
                </Label>
              </div>
            ))}
            <div className="fixed h-16 bottom-0 flex justify-between items-center px-2 border-t-2 left-0 w-full ">
              100+ Products <Button>Done</Button>
            </div>
          </div>
        );
      case "Gender":
        return (
          <div className="flex flex-col p-3 gap-5  overflow-x-auto mb-16 relative">
            <div className="flex gap-5">
              <label
                htmlFor="Men"
                className="flex flex-col justify-center items-center"
              >
                <input id="men" type="radio" className="hidden" />
                <img src={product2} alt="" className="h-16 w-16 rounded-full" />
                <p>Men</p>
              </label>
              <label
                htmlFor="women"
                className="flex flex-col justify-center items-center"
              >
                <input id="women" type="radio" className="hidden" />
                <img src={product1} alt="" className="h-16 w-16 rounded-full" />
                <p>Women</p>
              </label>
              <label
                htmlFor="boy"
                className="flex flex-col justify-center items-center"
              >
                <input id="boy" type="radio" className="hidden" />
                <img src={product1} alt="" className="h-16 w-16 rounded-full" />
                <p>Boy</p>
              </label>
              <label
                htmlFor="girl"
                className="flex flex-col justify-center items-center"
              >
                <input id="girl" type="radio" className="hidden" />
                <img src={product1} alt="" className="h-16 w-16 rounded-full" />
                <p>Girl</p>
              </label>
            </div>
            <div className="fixed h-16 bottom-0 flex  justify-between items-center px-2 border-t-2 left-0 w-full ">
              100+ Products <Button>Done</Button>
            </div>
          </div>
        );
      case "Filter":
        return <div>Filter options content goes here</div>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-12">
      {/* Search Bar */}
      <div className="p-3">
        <MemoizedSearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          showResult={true}
        />
      </div>

      {/* Swiper Section */}
      <div className="p-2 relative">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Thumbs, Autoplay]}
          className="h-[150px] w-full"
          onSlideChange={handleSlideChange}
        >
          {slide.map((slides, index) => (
            <SwiperSlide key={index}>
              <img
                src={slides.Img}
                onClick={() => navigate(`${slides.link}`)}
                alt={`Product ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slide.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-fuchsia-700" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          watchSlidesProgress
          className="mt-5"
        />
      </div>

      {/* Daily Deals Section */}
      <div className="flex flex-col p-3 gap-2 w-full">
        <h3 className="font-mier-demi">Daily Deals</h3>
        <div className="flex h-28 overflow-x-auto w-full no-scrollbar gap-2">
          {deals.map((deal, index) => (
            <div key={index} className="flex-shrink-0 w-28 h-full">
              <img
                src={deal.Img}
                alt={deal}
                onClick={() => navigate(`${deal.link}`)}
                className="w-full h-full object-cover border border-slate-600 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="flex flex-col p-3 gap-2 w-full">
        <h3 className="font-mier-demi">Category</h3>
        <div className="flex h-16 overflow-x-auto no-scrollbar w-full gap-2">
          {filterData.map((category, index) => (
            <div
              key={index}
              className="flex-shrink-0 cursor-pointer border w-12 h-12 rounded-full overflow-hidden"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-full object-contain border rounded-full"
              />
            </div>
          ))}
        </div>
        <img src={mobile_poster} alt="Mobile Poster" className="w-full mt-3" />
      </div>

      {/* Filter, Sort, Category, and Gender Options */}
      <div className="flex border-2 sticky top-0 justify-around z-30 bg-white">
        {[
          { label: "Sort", icon: <TbArrowsSort /> },
          { label: "Category", icon: <FaAngleDown /> },
          { label: "Gender", icon: <FaAngleDown /> },
          { label: "Filter", icon: <IoFilter /> },
        ].map((option, index) => (
          <React.Fragment key={index}>
            <Drawer>
              <DrawerTrigger asChild>
                <div
                  className="flex text-sm w-[25%] justify-center py-3 border font-mier-demi gap-1 items-center"
                  onClick={() => setActiveDrawer(option.label)}
                >
                  {option.icon} {option.label}
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>
                      <div className="flex justify-between mb-5 items-center">
                        {option.label}
                        <DrawerClose asChild>
                          <IoClose />
                        </DrawerClose>
                      </div>
                      <Separator />
                    </DrawerTitle>
                  </DrawerHeader>
                </div>
                {renderDrawerContent()}
              </DrawerContent>
            </Drawer>
            {index < 3 && <Separator orientation="vertical" />}
          </React.Fragment>
        ))}
      </div>

      {/* Card Display Section */}
      <CardDisplay heading="Products for You" />
    </div>
  );
};

export default MobileHome;
