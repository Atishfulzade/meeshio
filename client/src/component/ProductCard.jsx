import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { getData } from "../utils/fetchData"; // Make sure this utility is imported
import { IoMdHeart } from "react-icons/io";

const ProductCard = ({ details }) => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const navigate = useNavigate();
  const [imageURL, setImageURL] = useState(null);
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    const fetchSignedImageUrl = async (key) => {
      const cleanedKey = key.replace("uploads/", ""); // Clean the key
      const response = await getData(`images/${cleanedKey}`);
      return response.signedUrl; // Adjust based on your API response structure
    };

    if (details?.product_images?.[0]) {
      fetchSignedImageUrl(details.product_images[0]).then(setImageURL);
    }
  }, [details]);

  if (!details) return <Loader />;

  return (
    <div
      className={`border cursor-pointer relative ${
        ismobile
          ? "h-80 w-1/2 mx-auto rounded-none border-collapse"
          : "lg:h-[360px] lg:w-[220px] h-72 w-40 rounded-md overflow-hidden "
      }`}
      onClick={() => navigate(`/product/${details._id}`)}
    >
      <img
        src={imageURL || details?.product_images?.[0]} // Use signed URL if available
        alt={details?.name}
        loading="lazy"
        className="w-full h-[61%] object-contain"
      />
      <span
        onClick={(e) => {
          e.stopPropagation();
          setFavorite(!favorite);
        }}
        className="absolute top-2 right-1"
      >
        <IoMdHeart
          size={22}
          fill={favorite ? "red" : "rgba(240, 249, 255, 0.75)"}
          className=" transition-all "
        />
      </span>
      <div className="flex flex-col p-1 lg:p-2 gap-0 lg:gap-1 overflow-hidden">
        <h3 className="font-mier-book line-clamp-1 p-0 text-sm lg:text-lg font-medium text-slate-600">
          {details?.name}
        </h3>
        <div className="flex font-mier items-center gap-2 text-slate-700 text-xs h-fit">
          <h2 className="text-xl lg:text-2xl font-medium text-slate-800 p-0 font-mier-demi">
            ₹{details?.min_product_price}
          </h2>
          <h2 className="text-sm lg:text-xl line-through font-medium text-slate-700 p-0 font-mier-demi">
            ₹{details?.min_catalog_price}
          </h2>
        </div>
        <span className="bg-slate-50 w-fit px-2 py-1 font-mier text-slate-700 lg:text-sm text-xs rounded-full">
          Free Delivery
        </span>
        <div className="flex font-mier-book font-medium text-xs lg:text-sm justify-start gap-2 items-center text-slate-600">
          <span className="bg-green-600 flex text-sm justify-center gap-1 font-mier text-white px-2 lg:px-3 lg:py-1 py-[2px] rounded-full items-center">
            3.6
            <FaStar fill="white" />
          </span>
          11548 Reviews
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
