import React, { useEffect } from "react";
import { Button } from "../components/ui/button";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Separator } from "@radix-ui/react-separator";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "/src/redux_store/userInfoSlice.js"; // Ensure the path is correct
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Product = ({ selectedImage, productDetails, signedUrls }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userInfo.cart);
  const userId = useSelector((state) => state.userInfo.id);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      dispatch(updateCart(JSON.parse(storedCart)));
    }
  }, [dispatch]);

  const addCart = async () => {
    try {
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productDetails.id
      );

      let updatedCart;

      if (existingProductIndex !== -1) {
        updatedCart = cart.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...cart, { ...productDetails, quantity: 1 }];
      }

      dispatch(updateCart(updatedCart));
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Uncomment if you want to send the cart to the server
      // await sendData("cart", { userId, cart: updatedCart });

      toast({
        title: "Product Added",
        description: "Product has been added to your cart.",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product to cart.",
        variant: "destructive",
      });
    }
  };

  const buyNow = () => {
    navigate("/checkout");
  };

  if (!productDetails) {
    return <Loader className="m-auto" />;
  }
  console.log(selectedImage);

  return (
    <div className="flex flex-col gap-5 md:w-[43%]">
      <div className="md:w-[360px] md:h-[360px] lg:h-[550px] lg:w-[550px] overflow-hidden rounded-md border">
        <img
          src={selectedImage || signedUrls[0]}
          alt={productDetails?.name || "Product Image"}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex lg:w-[550px] md:w-[360px] gap-2 justify-between">
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
