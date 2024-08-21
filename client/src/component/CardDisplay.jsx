import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { getData } from "../utils/fetchData";
import Loader from "./Loader";

const CardDisplay = () => {
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData("products");

        // Process the images for each product
        const processedProducts = data.map((product) => {
          // Check if the images property is an array
          if (Array.isArray(product.images)) {
            return product; // If valid, return product as is
          }

          // Handle malformed JSON string for images
          if (typeof product.images === "string") {
            try {
              const parsedImages = JSON.parse(product.images);
              if (Array.isArray(parsedImages)) {
                // Clean up any unwanted formatting issues with URLs
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
        setFilteredProducts(processedProducts); // Initialize with all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex w-full flex-col justify-between pt-3">
      <h4 className="text-xl my-2 font-mier-bold">Products for You</h4>
      <div className="flex justify-between">
        {/* Render Sidebar only if not on mobile */}
        {!isMobile && (
          <Sidebar products={products} setFilterProduct={setFilteredProducts} />
        )}

        {/* Conditionally render Cards or Loader */}
        {products.length > 0 ? (
          <Cards ref={cardRef} width={"w-[80%]"} products={filteredProducts} />
        ) : (
          <div className="flex h-full w-full justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDisplay;
