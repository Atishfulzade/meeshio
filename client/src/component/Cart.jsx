import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { HiPlus, HiMinusSm } from "react-icons/hi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { Button } from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../redux_store/userInfoSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { getData, sendData } from "../utils/fetchData";

const Cart = ({ nextStep }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userInfo.cart);
  const userId = useSelector((state) => state.userInfo.id);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const { toast } = useToast();

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [imageURLs, setImageURLs] = useState({}); // To store signed URLs for images

  useEffect(() => {
    const calculatePrices = () => {
      const newTotalPrice = cart.reduce(
        (acc, item) => acc + item.min_product_price * (item.quantity || 1),
        0
      );
      const discount = 0.1; // Example: 10% discount
      const newDiscountedPrice = newTotalPrice * (1 - discount);

      setTotalPrice(newTotalPrice);
      setDiscountPercentage(discount);
      setDiscountedPrice(newDiscountedPrice);
    };

    calculatePrices();
  }, [cart]);

  const increaseCount = async (index) => {
    // Logic to increase the item count
  };

  const decreaseCount = async (index) => {
    // Logic to decrease the item count
  };

  const removeItem = async (index) => {
    try {
      const updatedCart = cart.filter((_, idx) => idx !== index);
      dispatch(updateCart(updatedCart));

      if (userId) {
        await sendData("/cart", userId, updatedCart); // Ensure this updates the backend
      }

      toast({
        title: "Item Removed",
        description: "The item has been removed from your cart.",
        status: "success",
      });
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Could not remove the item from the cart.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchSignedImageUrl = async (key) => {
      const cleanedKey = key.replace("uploads/", ""); // Clean the key
      const response = await getData(`images/${cleanedKey}`);
      return response.signedUrl; // Adjust based on your API response structure
    };

    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        cart.map((item) => fetchSignedImageUrl(item.product_images[0]))
      );
      const updatedURLs = {};
      cart.forEach((item, index) => {
        updatedURLs[item.product_images[0]] = urls[index];
      });
      setImageURLs(updatedURLs);
    };

    if (cart.length > 0) {
      fetchImageUrls();
    }
  }, [cart]);

  return (
    <div className="mt-5 md:h-[86vh] md:px-24 gap-10 px-0 justify-center md:gap-3 flex flex-col md:flex-row">
      {cart.length === 0 ? (
        <div className="text-3xl text-center h-[20vh] font-mier-demi text-fuchsia-700 mt-10">
          Your Cart is Empty
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-mier ms-2">Product Details</h3>
            <div className="flex flex-col gap-2 h-full p-2 md:p-0">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between border md:w-[600px] min-w-[300px] rounded-md h-fit"
                >
                  <div className="flex p-3">
                    <img
                      className="h-20 w-20 object-contain rounded-md border"
                      src={imageURLs[item.product_images[0]] || ""} // Use the signed URL here
                      alt={item?.name}
                    />
                    <div className="flex flex-col w-full gap-1 ps-3">
                      <h3 className="text-xl font-mier-demi text-slate-800 leading-5 flex-wrap line-clamp-2">
                        {item?.name}
                      </h3>
                      <p className="line-clamp-1 font-mier-book text-xs">
                        {item?.description}
                      </p>
                      <div className="flex font-mier-demi w-full flex-col md:flex-row md:gap-4">
                        <span className="whitespace-nowrap">
                          Price: ₹{item?.min_product_price}
                        </span>
                        <span>• Selected Size: Free</span>
                        <div className="flex gap-2">
                          • Quantity:
                          <div className="flex select-none flex-shrink-0 text-sm overflow-hidden justify-around items-center border h-8 w-32 rounded-md">
                            <HiMinusSm
                              onClick={() => decreaseCount(index)}
                              className={`${
                                (item.quantity || 1) <= 1
                                  ? "cursor-not-allowed text-gray-400"
                                  : "hover:bg-slate-200 cursor-pointer"
                              } w-[30%] h-8 p-2 active:bg-slate-300`}
                            />
                            <span className="border-x-2 w-[40%] text-center">
                              {item.quantity || 1}
                            </span>
                            <HiPlus
                              onClick={() => increaseCount(index)}
                              className={`${
                                (item.quantity || 1) >= 10
                                  ? "cursor-not-allowed text-gray-400"
                                  : "hover:bg-slate-200 cursor-pointer"
                              } w-[30%] h-8 p-2 active:bg-slate-300`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center font-mier-demi mt-2 justify-between cursor-pointer uppercase hover:text-slate-600">
                        <p className="flex items-center gap-2">
                          <FaRegEdit size={20} /> Edit
                        </p>
                        <p
                          className="flex items-center gap-1"
                          onClick={() => removeItem(index)}
                        >
                          <IoClose size={22} /> Remove
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between border-t-2 p-2">
                    <h4 className="text-slate-700 font-mier-demi">
                      Sold By :&nbsp;
                      <span className="uppercase text-lg font-mier-book">
                        Atishfulzade
                      </span>
                    </h4>
                    <p className="text-lg">Free Delivery</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:w-96 w-full p-3 md:p-0">
            <h3 className="text-xl font-mier-bold my-1 text-left">
              Product Details ({cart.length}) products
            </h3>
            <div className="flex-col flex rounded-md font-mier-demi text-slate-600 border gap-3 p-3">
              <div className="flex text-lg justify-between">
                <h4>Total Product price</h4>
                <span>{cart.length} Quantity</span>
                <span>₹ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex text-lg justify-between text-green-600 font-mier-demi">
                <h4>Total Discounts</h4>
                <span>₹ {(discountPercentage * totalPrice).toFixed(2)}</span>
              </div>
              <div className="flex border-t-2 text-lg justify-between font-mier-demi">
                <h4>Order Total</h4>
                <span>₹ {discountedPrice.toFixed(2)}</span>
              </div>
              <div className="flex text-lg bg-green-200 p-2 text-green-700 rounded-md justify-center items-center gap-2 font-mier-demi">
                <RiDiscountPercentLine />
                Yay! Your total discount is ₹
                {(discountPercentage * totalPrice).toFixed(2)}
              </div>
              <p className="text-xs font-mier-demi">
                Clicking on 'Continue' will not deduct any money
              </p>
              <Button
                onClick={() => {
                  if (isLoggedIn) {
                    toast({
                      title: "Proceeding to Checkout",
                      description: "You are being redirected to the next step.",
                      status: "success",
                    });
                    nextStep();
                  } else {
                    toast({
                      title: "Login Required",
                      description: "Please log in to proceed.",
                      status: "error",
                    });
                    navigate("/user/authenticate");
                  }
                }}
                className="flex text-lg bg-fuchsia-700 hover:bg-fuchsia-800 p-2 text-white rounded-md justify-center items-center gap-2 font-mier-demi"
              >
                Continue
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
