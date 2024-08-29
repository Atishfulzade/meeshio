import React from "react";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { HiPlus, HiMinusSm } from "react-icons/hi";
import { Button } from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../redux_store/userInfoSlice";
import { toast } from "../components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useNavigate } from "react-router-dom";

const Summary = ({ nextStep }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.userInfo.cart);

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );

  // Define discount percentage and calculate discounted price
  const discountPercentage = 0.2;
  const discountedPrice = totalPrice * (1 - discountPercentage);

  // Increase item quantity in the cart
  const increaseCount = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index && (item.quantity || 1) < 10
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    dispatch(updateCart(updatedCart));
  };

  // Decrease item quantity in the cart
  const decreaseCount = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index && (item.quantity || 1) > 1
        ? { ...item, quantity: (item.quantity || 1) - 1 }
        : item
    );
    dispatch(updateCart(updatedCart));
  };

  // Remove an item from the cart
  const removeItem = (index) => {
    const updatedCart = cart.filter((_, idx) => idx !== index);
    dispatch(updateCart(updatedCart));
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    dispatch(updateCart([])); // Empty the cart
    navigate("/"); // Navigate to the home page

    // Show success toast notification
    toast({
      title: "Order placed successfully",
      action: <ToastAction altText="Continue">OK</ToastAction>, // Optional action button
    });

    // Proceed to the next step
    nextStep();
  };

  return (
    <div className="mt-5 md:h-[86vh] md:px-24 gap-10 px-0 justify-center md:gap-3 md:flex-row flex-col flex">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-mier">Product Details</h3>
        <div className="flex flex-col gap-2 h-full p-2 md:p-0">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex flex-col justify-between border md:w-[600px] min-w-[300px] rounded-md h-fit"
            >
              <div className="flex p-3">
                <img
                  className="h-20 w-20 object-contain rounded-md border"
                  src={item?.images[0]}
                  alt={item?.title}
                />
                <div className="flex flex-col w-full gap-1 ps-3">
                  <h3 className="text-xl font-mier-demi text-slate-800 leading-5 flex-wrap line-clamp-2">
                    {item?.title}
                  </h3>
                  <p className="line-clamp-1 font-mier-book text-xs">
                    {item?.description}
                  </p>
                  <div className="flex font-mier-demi w-full flex-col md:flex-row md:gap-4">
                    <span className="whitespace-nowrap">
                      Price: ₹{item?.price}
                    </span>
                    <span>• Selected Size: Free</span>
                    <div className="flex gap-2">
                      • Quantity:
                      <div className="flex gap-1">{item.quantity || 1}</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => removeItem(index)} className="ml-auto">
                  <IoClose />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:w-96 w-full">
        <h3 className="text-xl font-mier-bold my-1 text-left">
          Order Summary ({cart.length} products)
        </h3>
        <div className="flex-col flex rounded-md font-mier-demi text-slate-600 border gap-3 p-3">
          <div className="flex text-lg justify-between">
            <h4>Total Product Price</h4>
            <span>{cart.length} Quantity</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex text-lg justify-between text-green-600 font-mier-demi">
            <h4>Total Discounts</h4>
            <span>₹ {(discountPercentage * totalPrice).toFixed(2)}</span>
          </div>
          <div className="flex text-lg justify-between font-mier-demi">
            <h4>Order Total</h4>
            <span>₹ {discountedPrice.toFixed(2)}</span>
          </div>
          <Button
            onClick={handlePlaceOrder} // Handle order placement
            className="flex text-lg bg-fuchsia-700 hover:bg-fuchsia-800 p-2 text-white rounded-md justify-center items-center gap-2 font-mier-demi"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
