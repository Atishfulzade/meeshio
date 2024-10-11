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
  const cart = useSelector((state) => state.userInfo.cart);
  const userId = useSelector((state) => state.userInfo.id);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.loggedIn.isLoggedIn);
  const { toast } = useToast();
  console.log("cart", cart);

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercentage] = useState(0.1); // 10% discount
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [imageURLs, setImageURLs] = useState();
  const [cartItems, setCartItems] = useState([]);
  const id = useSelector((state) => state.userInfo.id);

  // Fetch cart items' details from the server
  useEffect(() => {
    const fetchCartFromServer = async () => {
      if (id) {
        const response = await getData(`cart`);
        dispatch(updateCart(response));
      }
    };
    fetchCartFromServer();

    const fetchCartItems = async () => {
      const fetchedItems = await Promise.all(
        cart.map(async (product) => {
          const response = await getData(`products/${product.id}`);
          return response;
        })
      );
      setCartItems(fetchedItems);
    };

    fetchCartItems();
  }, [cart, dispatch, id]);

  // Calculate total price and discounted price
  useEffect(() => {
    const newTotalPrice = cart.reduce(
      (acc, item) => acc + item.min_product_price * (item.quantity || 1),
      0
    );
    setTotalPrice(newTotalPrice);
    setDiscountedPrice(newTotalPrice * (1 - discountPercentage));
  }, [cart, discountPercentage]);

  // Increase quantity of an item in the cart
  const increaseCount = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index ? { ...item, quantity: item.quantity + 1 } : item
    );
    dispatch(updateCart(updatedCart));
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity of an item in the cart
  const decreaseCount = (index) => {
    const updatedCart = cart.map((item, idx) =>
      idx === index && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    dispatch(updateCart(updatedCart));
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove item from the cart
  const removeItem = async (_id) => {
    try {
      // Filter the cart to remove the item locally
      const filteredCart = cart.filter((item) => item._id !== _id);

      // Update the Redux store with the filtered cart
      dispatch(updateCart(filteredCart));

      // Update session storage with the new cart data
      sessionStorage.setItem("cart", JSON.stringify(filteredCart));

      // Delete the item from the server-side cart if the user is logged in
      if (id) {
        const response = await deleteData(`cart/${userId}`, {
          userId,
          productId: _id,
        });
        console.log("Backend Response:", response);
      }

      // Display success message
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

  // Fetch image URLs for the products
  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        cartItems.map(async (item) => {
          if (item.product_images && item.product_images.length > 0) {
            const cleanedKey = item.product_images[0].replace("uploads/", "");
            const response = await getData(`images/${cleanedKey}`);
            return response.signedUrl; // Assuming response contains a signedUrl
          }
          return null; // If no images, return null
        })
      );

      // Assign URLs directly to the product list (to maintain index correspondence)
      setImageURLs(urls);
    };

    if (cartItems.length > 0) {
      fetchImageUrls();
    }
  }, [cartItems]);

  if (!cartItems.length) return <Loader />;

  return (
    <div className="mt-20 md:h-[86vh] md:px-24 gap-10 h-screen px-0 justify-center md:gap-3 flex flex-col md:flex-row">
      {cartItems.length === 0 ? (
        <div className="text-xl md:mt-52 pt-10 h-screen mt-72 text-center font-mier-demi text-fuchsia-700">
          Your Cart is Empty
        </div>
      ) : (
        <>
          {/* Product Details */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-mier ms-2">Product Details</h3>
            <div className="flex flex-col gap-2 h-full p-2 md:p-0">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between border md:w-[600px] min-w-[300px] rounded-md h-fit"
                >
                  <div className="flex justify-between p-2">
                    <img
                      src={imageURLs?.[0]} // Use index to map the correct image URL
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
                          {cart[index].quantity}
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
                      onClick={() => removeItem(item._id)} // Ensure that _id exists
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Section */}
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
                    navigate("/login");
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
