import React, { useEffect, useState } from "react";
import { Separator } from "../components/ui/separator";
import { IoMdArrowBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { getData } from "../utils/fetchData";
import AddressPopup from "./AddressPopup";

const Address = ({
  nextStep,
  totalPrice,
  discountPercentage,
  discountedPrice,
  prevStep,
}) => {
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  const cart = useSelector((state) => state.cart.cart);
  const userId = localStorage.getItem("userId") || "";
  const [addressDetail, setAddressDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch address data
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      try {
        const response = await getData(`user/profile`); // Adjust endpoint as necessary
        setAddressDetail(response?.address || null);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, [userId]);

  const proceedWithAddress = () => {
    if (addressDetail) {
      nextStep();
    }
  };

  return (
    <div className="mt-5 lg:h-[86vh] w-full lg:px-24 px-0 justify-center lg:gap-3 lg:flex-row flex-col flex">
      {/* Address Section */}
      <div className="flex flex-col md:gap-2 w-full md:w-1/2">
        {/* Back button */}
        <span
          onClick={prevStep}
          className="absolute md:top-24 top-16 md:left-10 left-3 border p-2 rounded-full cursor-pointer"
        >
          <IoMdArrowBack />
        </span>

        <h3 className="text-xl my-2 font-mier-bold">Address Details</h3>

        <div className="flex flex-col gap-2 md:h-full">
          {loading ? (
            <p>Loading address...</p>
          ) : (
            <>
              {addressDetail ? (
                <div
                  key={addressDetail._id}
                  className="flex border flex-col p-3 md:w-[400px] w-full rounded-md gap-1 bg-slate-200 h-fit space-x-2 my-2"
                >
                  <div className="flex flex-col items-start">
                    <h5>{addressDetail.name}</h5>
                    <p>Contact: {addressDetail.contact}</p>
                    <p>{addressDetail.landmark}</p>
                    <p>
                      {addressDetail.street}, <br />
                      {addressDetail.city},
                    </p>
                    {addressDetail.state}, {addressDetail.pin} <br />
                  </div>
                  <AddressPopup
                    addressDetail={addressDetail}
                    title="Update address"
                    description="Update your delivery address"
                  />
                </div>
              ) : (
                <AddressPopup
                  addressDetail={{}}
                  title="Add address"
                  description="Add your delivery address"
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Vertical separator for non-mobile view */}
      {!isMobile && <Separator orientation="vertical" />}

      {/* Product Details Section */}
      <div className="flex flex-col md:w-96 w-full p-2 lg:p-0">
        <h3 className="text-xl font-mier my-1">
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
          <Separator />
          <div className="flex text-lg justify-between font-mier-demi">
            <h4>Order Total</h4>
            <span>₹ {discountedPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={proceedWithAddress}
            disabled={!addressDetail}
            className={`mt-3 px-4 py-2 rounded-md ${
              addressDetail
                ? "bg-fuchsia-700 text-white"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
