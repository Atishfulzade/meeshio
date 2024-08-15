import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { product1 } from "../assets"; // Ensure product1 is properly imported and optimized

const MobileHome = () => {
  return (
    <div className="mt-11">
      <div className="">
        <Swiper
          spaceBetween={50}
          className="h-44 w-full"
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {/* Swiper Slide 1 */}
          <SwiperSlide>
            <img
              src={product1}
              alt="Product 1"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>

          {/* Swiper Slide 2 */}
          <SwiperSlide>
            <img
              src={product1}
              alt="Product 1"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>

          {/* Swiper Slide 3 */}
          <SwiperSlide>
            <img
              src={product1}
              alt="Product 1"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>

          {/* Swiper Slide 4 */}
          <SwiperSlide>
            <img
              src={product1}
              alt="Product 1"
              className="object-cover h-full w-full"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default MobileHome;
