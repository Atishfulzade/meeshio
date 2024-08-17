import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { product1, product2, product3 } from "../assets"; // Ensure product1 is properly imported and optimized
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import { Button } from "@/components/ui/button";
import { TbArrowsSort } from "react-icons/tb";
import { FaAngleDown } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "../components/ui/separator";
import CardDisplay from "./CardDisplay";

const MobileHome = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [product1, product1, product1, product1]; // Array of your slide images

  return (
    <div className="mt-12">
      <div className="p-3">
        <SearchBar />
      </div>
      <div className="p-2 relative">
        {/* Main Swiper for larger images */}
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }} // Autoplay after 3 seconds
          thumbs={{ swiper: thumbsSwiper }} // Connect the thumbs swiper
          modules={[Thumbs, Autoplay]} // Include Autoplay module
          className="h-[150px] w-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active slide
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <img
                src={slide}
                alt={`Product ${index + 1}`}
                className="object-cover h-full w-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dot Progress Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
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
          onSwiper={setThumbsSwiper} // Set the state with the thumbnail swiper instance
          spaceBetween={10}
          slidesPerView={4} // Show 4 thumbnails at a time
          watchSlidesProgress
          className="mt-5"
        ></Swiper>
      </div>
      <div className="flex flex-col p-3 gap-2 w-full">
        <h3 className="font-mier-demi">Daily Deals</h3>
        <div className="flex h-28 overflow-x-auto w-full gap-2">
          <div className="flex-shrink-0 w-28 h-full">
            <img
              src={product1}
              alt=""
              className="w-full h-full object-cover border border-slate-600 rounded-lg"
            />
          </div>
          <div className="flex-shrink-0 w-28 h-full">
            <img
              src={product1}
              alt=""
              className="w-full h-full object-cover border border-slate-600 rounded-lg"
            />
          </div>
          <div className="flex-shrink-0 w-28 h-full">
            <img
              src={product1}
              alt=""
              className="w-full h-full object-cover border border-slate-600 rounded-lg"
            />
          </div>
          <div className="flex-shrink-0 w-28 h-full">
            <img
              src={product1}
              alt=""
              className="w-full h-full object-cover border border-slate-600 rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex border-2 sticky top-0 justify-around z-30 bg-white">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex text-sm w-[25%] justify-center py-3 border font-mier-demi gap-1 items-center">
                <TbArrowsSort /> Sort
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    hollo
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        goal
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                    >
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">hello world</div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <Separator orientation="vertical" />
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex text-sm w-[25%] justify-center py-3 border font-mier-demi gap-1 items-center">
                Category <FaAngleDown />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    hollo
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        goal
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                    >
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">hello world</div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <Separator orientation="vertical" />
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex text-sm w-[25%] justify-center py-3 border font-mier-demi gap-1 items-center">
                Gender <FaAngleDown />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    hollo
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        goal
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                    >
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">hello world</div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
          <Separator orientation="vertical" />
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex text-sm w-[25%] justify-center py-3 border font-mier-demi gap-1 items-center">
                <IoFilter /> Filter
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Move Goal</DrawerTitle>
                  <DrawerDescription>
                    Set your daily activity goal.
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    hollo
                    <div className="flex-1 text-center">
                      <div className="text-7xl font-bold tracking-tighter">
                        goal
                      </div>
                      <div className="text-[0.70rem] uppercase text-muted-foreground">
                        Calories/day
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 shrink-0 rounded-full"
                      onClick={() => onClick(10)}
                    >
                      <span className="sr-only">Increase</span>
                    </Button>
                  </div>
                  <div className="mt-3 h-[120px]">hello world</div>
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <CardDisplay />
      </div>
    </div>
  );
};

export default MobileHome;
