import React, { useEffect, useState } from "react";
import ProductGallary from "../component/ProductGallary";
import Product from "../component/Product";
import ProductInfo from "../component/ProductInfo";
import Cards from "../component/Cards";
import { useParams } from "react-router-dom";
import { getData } from "../utils/fetchData";
import Loader from "../component/Loader";
import { fetchSignedUrls } from "../utils/signedUrl";
const ProductPage = () => {
  const { productId } = useParams();
  const [signedUrls, setSignedUrls] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getData(`products/${productId}`);
      setProductDetails(data);
    };
    fetchProductDetails();
  }, [productId]);

  useEffect(() => {
    const fetchImages = async () => {
      if (productDetails?.product_images?.length) {
        try {
          const urls = await fetchSignedUrls(productDetails.product_images);
          setSignedUrls(urls.filter(Boolean));
        } catch (error) {
          console.error("Error fetching signed URLs:", error);
        }
      }
    };

    fetchImages();
  }, [productDetails]);

  if (!productDetails) return <Loader />;

  return (
    <div className="flex w-full flex-col gap-3 lg:px-24 p-3 md:mt-32 mt-11 items-center">
      <div className="w-full flex md:flex-row flex-col lg:justify-between justify-center h-full">
        <div className="flex lg:justify-start md:w-[50%] gap-2">
          <ProductGallary
            productDetails={productDetails}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            signedUrls={signedUrls} // Pass signedUrls to ProductGallary
          />
          <Product
            productDetails={productDetails}
            selectedImage={selectedImage}
            signedUrls={signedUrls} // Pass signedUrls to Product
          />
        </div>
        <ProductInfo productDetails={productDetails} />
      </div>
      <Cards width={"w-full"} />
    </div>
  );
};

export default ProductPage;
