import React, { useEffect, useState } from "react";
import ProductGallary from "../component/ProductGallary";
import Product from "../component/Product";
import ProductInfo from "../component/ProductInfo";
import Cards from "../component/Cards";
import { useParams } from "react-router-dom";
import { getData } from "../utils/fetchData";

const ProductPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState();
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    const result = async () => {
      const data = await getData(`products/${productId}`);
      setProductDetails(data);
    };
    result();
  }, []);
  console.log(productDetails);

  return (
    <div className="flex w-full flex-col gap-3 md:px-24 p-3  md:mt-32 mt-11 items-center">
      <div className="w-full flex md:flex-row flex-col  md:justify-between  justify-center  h-full">
        <div className="flex justify-between  gap-2">
          <ProductGallary
            productDetails={productDetails}
            setSelectedImage={setSelectedImage}
          />
          <Product
            productDetails={productDetails}
            selectedImage={selectedImage}
          />
        </div>
        <ProductInfo productDetails={productDetails} />
      </div>
      <Cards width={"w-full"} />
    </div>
  );
};

export default ProductPage;
