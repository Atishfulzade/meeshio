import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Separator } from "@radix-ui/react-separator";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "/src/redux_store/userInfoSlice.js"; // Make sure the path is correct
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Product = ({ selectedImage, productDetails }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userInfo.cart);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Retrieve cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(updateCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  const addCart = () => {
    // Add the product to the existing cart
    const updatedCart = [...cart, productDetails];

    // Dispatch the updated cart to Redux
    dispatch(updateCart(updatedCart));

    // Store the updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast({
      title: "Product Added",
      description: "Product has been added to your cart.",
      variant: "success",
    });
  };

  const buyNow = () => {
    // Redirect to checkout page or handle buy now logic
    navigate("/checkout");
    toast({
      title: "Redirecting",
      description: "You are being redirected to checkout.",
      variant: "info",
    });
  };

  if (!productDetails) {
    return <Loader className="m-auto" />;
  }

  return (
    <div className="flex flex-col gap-5 md:w-[43%]">
      <div className="md:w-[400px] md:h-[400px] lg:h-[550px] lg:w-[550px] overflow-hidden rounded-md border">
        <img
          src={selectedImage || productDetails?.images[0]}
          alt={productDetails?.title}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex md:w-[550px] gap-2 justify-between">
        <Button
          onClick={addCart}
          variant="outline"
          className="border-fuchsia-800 font-mier-bold font-semibold h-12 text-lg text-fuchsia-800 w-1/2"
        >
          <HiMiniShoppingCart size={20} className="mr-2" />
          Add to cart
        </Button>
        <Button
          onClick={buyNow}
          className="bg-fuchsia-800 font-mier-bold font-semibold text-lg h-12 w-1/2"
        >
          <FaAngleDoubleRight size={20} className="mr-2" />
          Buy Now
        </Button>
        <Separator orientation="horizontal" />
      </div>
    </div>
  );
};

export default Product;
