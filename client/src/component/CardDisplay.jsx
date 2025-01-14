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
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(16);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getData("products");
        const processedProducts = data.map((product) => {
          if (typeof product.images === "string") {
            try {
              const parsedImages = JSON.parse(product.images);
              product.images = Array.isArray(parsedImages)
                ? parsedImages.map((img) => img.replace(/["\\[\\]]/g, ""))
                : [];
            } catch {
              product.images = [];
            }
          }
          return product;
        });

        setProducts(processedProducts);
        setFilteredProducts(processedProducts);
        setVisibleProducts(processedProducts.slice(0, itemsToShow));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    setVisibleProducts(filteredProducts.slice(0, itemsToShow));
  }, [filteredProducts, itemsToShow]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [filteredProducts, itemsToShow]);

  const loadMoreItems = () => {
    if (itemsToShow < filteredProducts.length) {
      setItemsToShow((prev) => prev + 16);
      setVisibleProducts(filteredProducts.slice(0, itemsToShow + 16));
    }
  };
  console.log("Products:", products);
  console.log("Filtered Products:", filteredProducts);
  console.log("Visible Products:", visibleProducts);

  return (
    <div className="flex w-full flex-col justify-between pt-3">
      <h4 className="text-xl my-2 font-mier-bold">{heading}</h4>
      <div className="flex justify-between w-full">
        {!isMobile && (
          <Sidebar products={products} setFilterProduct={setFilteredProducts} />
        )}

        {visibleProducts.length > 0 ? (
          <div className="flex flex-col w-full">
            <Cards ref={cardRef} width={"w-full"} products={visibleProducts} />
            <div ref={observerRef} className="h-10 w-full"></div>
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
