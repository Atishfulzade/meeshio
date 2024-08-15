import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { product1, product2, product3 } from "../assets"; // Ensure product1 is properly imported and optimized
import SearchBar from "./SearchBar";

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
        <div className="flex  h-28 overflow-x-auto w-full gap-2">
          <img
            src={product1}
            alt=""
            className="w-28 h-28 object-cover border border-slate-600 rounded-lg"
          />
          <img
            src={product1}
            alt=""
            className="w-28 h-full object-cover border border-slate-600 rounded-lg"
          />
          <img
            src={product1}
            alt=""
            className="w-28 h-full object-cover border border-slate-600 rounded-lg"
          />
          <img
            src={product1}
            alt=""
            className="w-28 h-full object-cover border border-slate-600 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileHome;
