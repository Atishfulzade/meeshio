import React from "react";
import { product1, product2, product3 } from "../assets";
import { Button } from "../components/ui/button";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Separator } from "@radix-ui/react-separator";

const Product = ({ selectedImage }) => {
  return (
    <div className="flex flex-col gap-5 md:w-[43%]">
      <div className="md:w-[400px]  md:h-[400px]  lg:h-[550px] lg:w-[550px] overflow-hidden rounded-md border">
        <img
          src={selectedImage}
          alt=""
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex w-full gap-2 justify-between">
        <Button
          variant="outline"
          className="border-fuchsia-800 font-mier-bold font-semibold h-12 text-lg text-fuchsia-800 w-1/2"
        >
          <HiMiniShoppingCart size={20} className="mr-2" />
          Add to cart
        </Button>
        <Button className="bg-fuchsia-800 font-mier-bold font-semibold text-lg h-12 w-1/2">
          <FaAngleDoubleRight size={20} className="mr-2" />
          Buy Now
        </Button>
        <Separator orientation="horizantal" />
      </div>
      {/* <div className="flex flex-col">
        <h4 className="font-mier-demi font-semibold my-2 text-slate-800">
          Similar 4 products
        </h4>
        <div className="flex w-full h-20 md:h-24 gap-2">
          <img
            src={product1}
            alt=""
            className="w-20 object-contain h-full cursor-pointer"
          />
          <img
            src={product2}
            alt=""
            className="w-20 object-contain h-full cursor-pointer"
          />
          <img
            src={product1}
            alt=""
            className="w-20 object-contain h-full cursor-pointer"
          />
          <img
            src={product3}
            alt=""
            className="w-20 object-contain h-full cursor-pointer"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Product;
