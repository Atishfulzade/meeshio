import React, { useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { mobile_poster, product1, product2 } from "../assets";
import SearchBar from "./SearchBar";

import { Button } from "@/components/ui/button";
import { TbArrowsSort } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import CardDisplay from "./CardDisplay";
import { deals, filterData, slide } from "../utils/constant";

// Memoize the SearchBar component
const MemoizedSearchBar = React.memo(SearchBar);

const MobileHome = () => {
  const slideref = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  // Memoize callback for slide change to prevent unnecessary re-renders
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  return (
    <div className="mt-12">
      {/* Search Bar outside the main content to avoid re-rendering */}
      <div className="p-3">
        <MemoizedSearchBar
          ref={slideref}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
      </div>

      {/* Swiper for larger images */}
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
                src={slides}
                alt={`Product ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dot Indicators */}
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

        {/* Thumbnail Swiper */}
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
        <div className="flex h-28 overflow-x-auto w-full gap-2">
          {deals.map((deal, index) => (
            <div key={index} className="flex-shrink-0 w-28 h-full">
              <img
                src={deal}
                alt=""
                className="w-full h-full object-cover border border-slate-600 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Category Section */}
      <div className="flex flex-col p-3 gap-2 w-full">
        <h3 className="font-mier-demi">Category</h3>
        <div className="flex h-16 overflow-x-auto w-full gap-2">
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
                <div className="flex text-sm w-[25%] justify-center py-3 border font-mier-demi gap-1 items-center">
                  {option.icon} {option.label}
                </div>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle>{option.label}</DrawerTitle>
                    <DrawerDescription>Set your preferences.</DrawerDescription>
                  </DrawerHeader>
                  <div className="p-4">Content for {option.label}</div>
                  <DrawerFooter>
                    <Button>Submit</Button>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
            {index < 3 && <Separator orientation="vertical" />}
          </React.Fragment>
        ))}
      </div>

      {/* Card Display Section */}
      <CardDisplay />
    </div>
  );
};

export default MobileHome;
