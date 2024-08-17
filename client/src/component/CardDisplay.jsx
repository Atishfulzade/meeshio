import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { getData } from "../utils/fetchData";

const CardDisplay = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);
  const [products, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getData("products");

      // Process the images for each product
      const processedProducts = data.map((product) => {
        if (Array.isArray(product.images)) {
          // Case 1: Properly formatted array, do nothing
          return product;
        }

        if (typeof product.images === "string") {
          // Case 2: Malformed JSON string
          try {
            const parsedImages = JSON.parse(product.images);

            if (Array.isArray(parsedImages)) {
              // Clean up any additional formatting issues with URLs
              product.images = parsedImages.map((img) =>
                img.replace(/["[\]]/g, "")
              );
            } else {
              product.images = []; // Fallback to empty array if parsing fails
            }
          } catch (error) {
            console.error("Failed to parse images string:", error);
            product.images = []; // Fallback to empty array on parsing failure
          }
        }

        return product;
      });

      setProducts(processedProducts);
      setFilterProduct(processedProducts); // Initialize filterProduct with all products
    };

    fetchProducts();
  }, []);

  console.log("Products:", products);

  return (
    <div className="flex w-full flex-col justify-between mt-[57px]">
      <h4>Products for You</h4>
      <div className="flex justify-between ">
        {!ismobile && (
          <Sidebar products={products} setFilterProduct={setFilterProduct} />
        )}
        {/* Conditionally render Cards when products are available */}
        {products.length > 0 ? (
          <Cards width={"w-[80%]"} products={filterProduct} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CardDisplay;
