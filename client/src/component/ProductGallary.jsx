import React from "react";

const ProductGallary = ({
  productDetails,
  setSelectedImage,
  selectedImage,
}) => {
  return (
    <div className="lg:w-20 w-8 h-8 md:w-10 md:h-10 flex-shrink-0 lg:h-full flex gap-1 flex-col ">
      {productDetails?.product_images?.map((image, i) => (
        <img
          key={i}
          src={image}
          onClick={() => setSelectedImage(image)}
          alt="image"
          className={`border-2 cursor-pointer w-full h-20 object-contain ${
            selectedImage === image ? "border-fuchsia-600" : "border-gray-300"
          } `}
        />
      ))}
    </div>
  );
};

export default ProductGallary;
