import React, { useEffect, useState, useRef } from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import { getData } from "../utils/fetchData";
import Loader from "./Loader";

const CardDisplay = ({ heading }) => {
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  const [products, setProducts] = useState([]);
  const cardRef = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]); // State to hold visible products
  const [itemsToShow, setItemsToShow] = useState(16); // State to track how many items to show
  const observerRef = useRef(null); // Reference for the Intersection Observer

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData("products");

        // Process the images for each product
        const processedProducts = data.map((product) => {
          if (Array.isArray(product.images)) {
            return product;
          }

          if (typeof product.images === "string") {
            try {
              const parsedImages = JSON.parse(product.images);
              if (Array.isArray(parsedImages)) {
                product.images = parsedImages.map((img) =>
                  img.replace(/["[\]]/g, "")
                );
              } else {
                product.images = [];
              }
            } catch (error) {
              console.error("Failed to parse images string:", error);
              product.images = [];
            }
          }
          return product;
        });

        setProducts(processedProducts);
        setFilteredProducts(processedProducts); // Initialize with all products
        setVisibleProducts(processedProducts.slice(0, itemsToShow)); // Show the first 16 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [itemsToShow]); // Re-run when itemsToShow changes

  useEffect(() => {
    // Create the Intersection Observer to detect when the user has reached the bottom of the list
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        root: null, // Default is the viewport
        rootMargin: "0px",
        threshold: 1.0, // Trigger when the entire element is in view
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current); // Observe the reference element
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current); // Clean up observer on unmount
      }
    };
  }, []);

  const loadMoreItems = () => {
    if (itemsToShow < filteredProducts.length) {
      setItemsToShow((prev) => prev + 16); // Load 16 more products
      setVisibleProducts(filteredProducts.slice(0, itemsToShow + 16));
    }
  };

  return (
    <div className="flex w-full flex-col justify-between pt-3">
      <h4 className="text-xl my-2 font-mier-bold">{heading}</h4>
      <div className="flex justify-between w-full ">
        {!isMobile && (
          <Sidebar products={products} setFilterProduct={setFilteredProducts} />
        )}

        {visibleProducts.length > 0 ? (
          <div className="flex flex-col  w-[100%] ">
            <Cards
              ref={cardRef}
              width={"w-[100%]"}
              products={visibleProducts}
            />
            {/* Load more trigger */}
            <div ref={observerRef} className="h-10 w-full "></div>
          </div>
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
