import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
const Cards = ({ width, products }) => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <div
      className={`flex flex-wrap h-fit justify-center ${
        ismobile ? "gap-0 w-full" : `gap-2 ${width}`
      }`}
    >
      {products?.map((details, j) => (
        <ProductCard key={j} details={details} />
      ))}
    </div>
  );
};

export default Cards;
