import React from "react";
import { product1 } from "../assets";

const ProductGallary = () => {
  return (
    <div className="w-20 h-full flex gap-1 flex-col ">
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
