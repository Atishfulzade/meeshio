import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { useParams } from "react-router-dom";
import { getData } from "../utils/fetchData";

const CategoryPage = () => {
  const { categoryName } = useParams(); // Destructure categoryName directly
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products based on category from API
  const getProductsByCategory = async () => {
    try {
      setLoading(true);
      const res = await getData(`products/category/${categoryName}`);
      setProducts(res || []); // Ensure it is an array
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryName) {
      getProductsByCategory();
    }
  }, [categoryName]);

  return (
    <div className="mt-28 px-20">
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center mt-20">No products found.</p>
      ) : (
        products.map((item, index) => (
          <ProductCard details={item} key={index} />
        ))
      )}
    </div>
  );
};

export default CategoryPage;
