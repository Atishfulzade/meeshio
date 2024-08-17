import React from "react";
import { product1 } from "../assets";

const ProductGallary = ({ productDetails, setSelectedImage }) => {
  return (
    <div className="md:w-20 w-8 h-8 flex-shrink-0 md:h-full flex gap-1 flex-col ">
      {productDetails?.images.map((image, i) => (
        <img
          key={i}
          src={image}
          onClick={() => setSelectedImage(image)}
          alt="image"
          className="border-2 cursor-pointer w-full h-20 object-contain border-gray-300"
        />
      ))}
    </div>
  );
};

export default ProductGallary;
