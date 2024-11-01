import React, { useEffect, useState } from "react";
import { Separator } from "../components/ui/separator";
import { IoMdArrowBack } from "react-icons/io";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";
import { getData } from "../utils/fetchData";

const Address = ({
  nextStep,
  totalPrice,
  discountPercentage,
  discountedPrice,
  prevStep,
}) => {
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  const cart = useSelector((state) => state.cart.cart);
  const userId = localStorage.getItem("userId"); // Use the correct userId from localStorage

  const [addressDetail, setAddressDetail] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Fetch address data
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await getData(`user/profile`); // Adjust endpoint as necessary
        setAddressDetail(response.data?.address || []); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleSelectAddress = (value) => {
    setSelectedAddress(value);
  };

  const proceedWithSelectedAddress = () => {
    if (selectedAddress) {
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

        {/* Header */}
        <h3 className="text-xl my-2 font-mier-bold">Address Details</h3>

        {/* Address List */}
        <div className="flex flex-col mt-20 gap-2 md:h-full">
          <div className="p-3">
            {addressDetail.length > 0 ? (
              <RadioGroup
                value={selectedAddress}
                onValueChange={handleSelectAddress}
              >
                {addressDetail.map((address) => (
                  <div
                    key={address._id}
                    className="flex border flex-col p-3 md:w-[400px] w-full rounded-md gap-1 bg-slate-200 h-fit space-x-2 my-2"
                  >
                    <div className="flex items-start">
                      <RadioGroupItem
                        value={address._id}
                        id={`address-${address._id}`}
                      />
                      <Label
                        htmlFor={`address-${address._id}`}
                        className="text-lg flex flex-col font-mier-book ml-2"
                      >
                        {address.street}, {address.city}, {address.state},{" "}
                        {address.zipCode} <br />
                        Contact: {address.contactNumber}
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <p>No addresses available.</p>
            )}

            {/* Proceed Button */}
            <Button
              className={`mt-4 ${
                selectedAddress
                  ? "bg-fuchsia-700 hover:bg-fuchsia-800"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              onClick={proceedWithSelectedAddress}
              disabled={!selectedAddress}
            >
              Use this address
            </Button>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default Address;
