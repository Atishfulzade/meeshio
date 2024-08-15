import React from "react";
import ProductGallary from "../component/ProductGallary";
import Product from "../component/Product";
import ProductInfo from "../component/ProductInfo";
import CardDisplay from "../component/CardDisplay";
import Cards from "../component/Cards";

const ProductPage = () => {
  return (
    <div className="flex w-full flex-col gap-3 px-24  mt-32 items-center">
      <div className="w-full flex  justify-between   h-full">
        <ProductGallary />
        <Product />
        <ProductInfo />
      </div>
      <Cards width={"w-full"} />
    </div>
  );
};

export default ProductPage;
