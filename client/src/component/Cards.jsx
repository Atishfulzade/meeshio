import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";
const Cards = ({ width }) => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <div
      className={`flex flex-wrap h-full justify-center ${
        ismobile ? "gap-0 w-full" : `gap-3 ${width}`
      }`}
    >
      {Array(12)
        .fill("")
        .map((_, j) => (
          <ProductCard key={j} />
        ))}
    </div>
  );
};

export default Cards;
