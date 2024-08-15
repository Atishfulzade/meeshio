import React from "react";
import ProductGallary from "../component/ProductGallary";
import Product from "../component/Product";
import ProductInfo from "../component/ProductInfo";
import CardDisplay from "../component/CardDisplay";
import Cards from "../component/Cards";

const ProductPage = () => {
  return (
    <div className="flex w-full flex-col gap-3 md:px-24 p-3  md:mt-32 mt-11 items-center">
      <div className="w-full flex md:flex-row flex-col  md:justify-between  justify-center  h-full">
        <div className="flex justify-between  gap-2">
          <ProductGallary />
          <Product />
        </div>
        <ProductInfo />
      </div>
      <Cards width={"w-full"} />
    </div>
  );
};

export default ProductPage;
