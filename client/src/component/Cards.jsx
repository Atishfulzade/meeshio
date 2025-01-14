import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Cards = forwardRef(({ products, width }, ref) => {
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  console.log(products);

  return (
    <div
      ref={ref} // Forwarded ref applied here
      className={`flex flex-wrap h-fit justify-center ${
        isMobile ? "gap-0 w-full " : `gap-5 ${width}`
      }`}
    >
      {products?.map((details) => (
        <ProductCard key={details._id} details={details} />
      ))}
    </div>
  );
});

export default Cards;
