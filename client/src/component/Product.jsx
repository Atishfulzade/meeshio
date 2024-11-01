import React, { useEffect } from "react";
import { Button } from "../components/ui/button"; // Ensure correct path
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaAngleDoubleRight } from "react-icons/fa";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux_store/cartSlice"; // Corrected path
import { useToast } from "../components/ui/use-toast"; // Corrected path
import { useNavigate } from "react-router-dom";

const Product = ({ selectedImage, productDetails, signedUrls }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart); // Get cart from Redux store
  const userId = useSelector((state) => state.userInfo.id); // Get user ID from Redux store
  const { toast } = useToast(); // Toast notifications hook
  const navigate = useNavigate(); // For route navigation

  // Load cart from sessionStorage when the component mounts
  useEffect(() => {
    const storedCart = sessionStorage.getItem("cart");
    if (storedCart && !cart.length) {
      dispatch(updateCart(JSON.parse(storedCart))); // Update Redux state with cart from sessionStorage
    }
  }, [dispatch, cart.length]); // Dependency array updated to prevent multiple re-renders

  // Function to add product to the cart
  const addCart = async (productId) => {
    try {
      // Check if the product is already in the cart
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productId
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        // If the product exists, increment its quantity
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If the product doesn't exist, add it with a quantity of 1
        updatedCart = [...cart, { id: productId, quantity: 1 }];
      }

      // Update Redux state with the new cart
      dispatch(updateCart(updatedCart));

      // Sync the updated cart with sessionStorage
      sessionStorage.setItem("cart", JSON.stringify(updatedCart));

      // Optionally, send the updated cart to the backend if the user is logged in
      if (userId) {
        await sendData("cart", { userId, productId, quantity: 1 });
      }

      // Show success notification
      toast({
        title: "Product Added",
        description: "Product has been added to your cart.",
        variant: "success",
      });
    } catch (error) {
      // Show error notification if the product couldn't be added to cart
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    }
  };

  // Navigate to checkout page
  const buyNow = () => {
    navigate("/checkout");
  };

  // Show loader if product details are not available
  if (!productDetails) {
    return <Loader className="m-auto" />;
  }

  return (
    <div className="flex flex-col gap-5 md:w-[43%]">
      {/* Product Image */}
      <div className="md:w-[360px] md:h-[360px] lg:h-[550px] lg:w-[550px] overflow-hidden rounded-md border">
        <img
          src={selectedImage || signedUrls[0]} // Show selected image or the first signed URL
          alt={productDetails?.name || "Product Image"} // Use the product name as the alt text
          className="h-full w-full object-contain"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex lg:w-[550px] md:w-[360px] gap-2 justify-between">
        {/* Add to Cart Button */}
        <Button
          onClick={() => addCart(productDetails._id)} // Add product to cart when clicked
          variant="outline"
          className="border-fuchsia-800 font-mier-bold font-semibold h-12 text-lg text-fuchsia-800 w-1/2"
        >
          <HiMiniShoppingCart size={20} className="mr-2" />
          Add to cart
        </Button>

        {/* Buy Now Button */}
        <Button
          onClick={buyNow} // Navigate to checkout page when clicked
          className="bg-fuchsia-800 font-mier-bold font-semibold text-lg h-12 w-1/2"
        >
          <FaAngleDoubleRight size={20} className="mr-2" />
          Buy Now
        </Button>
      </div>

      {/* Stock Notification */}
      <p className="font-mier-demi text-green-600 text-lg w-full">
        {productDetails.available_stock < 100
          ? "Few stock left, order now!"
          : ""}
      </p>
    </div>
  );
};

export default Product;
