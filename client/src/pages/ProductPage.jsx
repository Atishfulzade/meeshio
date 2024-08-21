import React, { useEffect, useState } from "react";
import ProductGallary from "../component/ProductGallary";
import Product from "../component/Product";
import ProductInfo from "../component/ProductInfo";
import Cards from "../component/Cards";
import { useParams } from "react-router-dom";
import { getData } from "../utils/fetchData";
import Loader from "../component/Loader";

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
  if (!productDetails) return <Loader />;
  return (
    <div className="flex w-full flex-col gap-3 lg:px-24 p-3  md:mt-32 mt-11 items-center">
      <div className="w-full flex md:flex-row flex-col  lg:justify-between  justify-center  h-full">
        <div className="flex lg:justify-start md:w-[50%]  gap-2">
          <ProductGallary
            productDetails={productDetails}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
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
