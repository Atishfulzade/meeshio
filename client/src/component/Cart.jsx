import React, { useEffect, useState } from "react";
import { HiPlus, HiMinusSm } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../redux_store/cartSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";
import { deleteData, getData } from "../utils/fetchData";
import Loader from "./Loader";
import { Button } from "../components/ui/button"; // Assuming you have a Button component
import { MdDeleteOutline } from "react-icons/md";

const Cart = ({ nextStep }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const userId = useSelector((state) => state.userInfo.id);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const { toast } = useToast();

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercentage] = useState(0.1); // 10% discount
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const fetchedItems = await Promise.all(
          cart.map(async (item) => {
            console.log(item);

            const response = await getData(
              `products/${item.id || item.productId._id}`
            );
            return { ...response, quantity: item.quantity };
          })
        );
        setCartItems(fetchedItems);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    console.log(cartItems);

    if (cart.length) {
      fetchCartItems();
    }
  }, [cart]);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (acc, item) => acc + item.min_product_price * (item.quantity || 1),
      0
    );
    setTotalPrice(newTotalPrice);
    setDiscountedPrice(newTotalPrice * (1 - discountPercentage));
  }, [cartItems, discountPercentage]);

  const increaseCount = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(updatedCart));
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseCount = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(updateCart(updatedCart));
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = async (productId) => {
    try {
      const filteredCart = cart.filter(
        (item) => item.productId._id !== productId
      );
      dispatch(updateCart(filteredCart));
      sessionStorage.setItem("cart", JSON.stringify(filteredCart));

      if (userId) {
        await deleteData(`cart`, { productId });
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

  if (!cartItems.length) return <Loader />;

  return (
    <div className="mt-20 md:h-[86vh] md:px-24 gap-10 h-screen px-0 justify-center md:gap-3 flex flex-col md:flex-row">
      {cartItems.length === 0 ? (
        <div className="text-xl md:mt-52 pt-10 h-screen mt-72 text-center font-mier-demi text-fuchsia-700">
          Your Cart is Empty
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-mier ms-2">Product Details</h3>
            <div className="flex flex-col gap-2 h-full p-2 md:p-0">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between border md:w-[600px] min-w-[300px] rounded-md h-fit"
                >
                  {console.log(item)}
                  <div className="flex justify-between p-2">
                    <img
                      src={item.imageURL || ""}
                      alt={item.name}
                      className="w-20 h-20"
                    />
                    <div className="flex flex-col ml-5">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="font-mier-book text-sm">
                        {item.description}
                      </p>
                      <p className="font-mier-demi text-2xl">
                        Price: ₹{item.min_product_price}{" "}
                        <span className="text-xl line-through text-stone-500">
                          {item.min_catalog_price}
                        </span>
                      </p>
                      <div className="flex border justify-between w-fit px-3 rounded-md items-center">
                        <HiMinusSm
                          className="cursor-pointer"
                          onClick={() => decreaseCount(index)}
                        />
                        <span className="mx-2 border px-3 select-none">
                          {item.quantity}
                        </span>
                        <HiPlus
                          className="cursor-pointer"
                          onClick={() => increaseCount(index)}
                        />
                      </div>
                    </div>
                    <MdDeleteOutline
                      size={20}
                      className="cursor-pointer text-red-500"
                      onClick={() => removeItem(item._id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:w-96 w-full p-3 md:p-0">
            <h3 className="text-xl font-mier-bold my-1 text-left">
              Product Details ({cart.length}) products
            </h3>
            <div className="border p-2">
              <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
              <p>Discount: ₹{(totalPrice * discountPercentage).toFixed(2)}</p>
              <p>Final Price: ₹{discountedPrice.toFixed(2)}</p>
              <Button
                onClick={() => {
                  if (isLoggedIn) {
                    nextStep();
                  } else {
                    navigate("/user/authenticate");
                  }
                }}
                className="bg-fuchsia-600 mt-3 text-white hover:bg-fuchsia-700"
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
