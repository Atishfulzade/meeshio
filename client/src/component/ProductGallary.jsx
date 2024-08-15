import React from "react";
import { product1 } from "../assets";

const ProductGallary = () => {
  return (
    <div className="md:w-20 w-8 h-8 flex-shrink-0 md:h-full flex gap-1 flex-col ">
      <img
        src={product1}
        alt=""
        className="border-2 cursor-pointer w-full h-20 object-contain border-fuchsia-900"
      />
      <img
        src={product1}
        alt=""
        className="border-2 cursor-pointer w-full h-20 object-contain border-gray-300"
      />
      <img
        src={product1}
        alt=""
        className="border-2 cursor-pointer w-full h-20 object-contain border-gray-300"
      />
    </div>
  );
};

export default ProductGallary;
