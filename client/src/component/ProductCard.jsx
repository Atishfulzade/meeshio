import React from "react";
import { product1, product2, product3 } from "../assets";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ProductCard = ({ details }) => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${details?.id}`)}
      className={`border cursor-pointer ${
        ismobile
          ? "h-80 w-1/2 mx-auto rounded-none border-collapse"
          : "lg:h-96 lg:w-[250px] h-72 w-44 rounded-md "
      }`}
    >
      <img
        src={details?.images[0]}
        alt={details?.title}
        loading="lazy"
        className="w-full h-[61%] object-contain"
      />
      <div className="flex flex-col p-1 lg:p-3 gap-0 lg:gap-1 overflow-hidden">
        <h3 className="font-mier-demi line-clamp-1 p-0 text-sm lg:text-lg font-medium text-slate-800">
          {details?.title}
        </h3>
        <div className="flex font-mier items-center gap-2 text-slate-700 text-xs h-fit">
          <h2 className="text-xl lg:text-2xl font-medium text-slate-800 p-0 font-mier-demi">
            ₹{details?.price}
          </h2>
          <h2 className="text-sm lg:text-xl line-through font-medium text-slate-700 p-0 font-mier-demi">
            ₹{details?.price + 82 + details?.id}
          </h2>
        </div>
        <span className="bg-slate-50 w-fit px-2 py-1 font-mier text-slate-700 lg:text-sm  text-xs rounded-full">
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
