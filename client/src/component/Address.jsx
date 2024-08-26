import React, { useState } from "react";
import { Separator } from "../components/ui/separator";
import { IoMdArrowBack } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../components/ui/button";
import { useSelector } from "react-redux";

const Address = ({
  nextStep,
  totalPrice,
  discountPercentage,
  discountedPrice,
  prevStep,
}) => {
  // Access state to determine if the device is mobile
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);

  // Access user's cart from Redux store
  const cart = useSelector((state) => state.userInfo.cart);

  // Dummy address data for demonstration
  const addressDetail = [
    {
      id: 1,
      name: "Atish Fulzade",
      contact: "7028415550",
      alternateContact: "7028415511",
      address: "Deulgaon Mali, India",
    },
    {
      id: 2,
      name: "John Doe",
      contact: "9876543210",
      alternateContact: "9123456789",
      address: "Aurangabad, India",
    },
  ];

  // State to store selected address ID
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Handles the selection of an address
  const handleSelectAddress = (value) => {
    setSelectedAddress(value);
  };

  // Proceeds to the next step only if an address is selected
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

        {/* Header and Add New Address Button */}
        <div className="flex md:justify-between justify-center md:flex-row flex-col p-3 md:p-0">
          <h3 className="text-xl my-2 font-mier-bold">Address Details</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-fuchsia-700 hover:bg-fuchsia-800">
                <HiPlus /> Add new address
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add new address</DialogTitle>
                <DialogDescription>
                  Enter the details for your new address below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 md:py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Address List */}
        <div className="flex flex-col mt-20 gap-2 md:h-full">
          <div className="p-3">
            <RadioGroup
              value={selectedAddress}
              onValueChange={handleSelectAddress}
            >
              {addressDetail.map((address) => (
                <div
                  key={address.id}
                  className="flex border flex-col p-3 md:w-[400px] w-full rounded-md gap-1 bg-slate-200 h-fit space-x-2 my-2"
                >
                  <div className="flex items-start">
                    <RadioGroupItem
                      value={address.id.toString()}
                      id={`address-${address.id}`}
                    />
                    <Label
                      htmlFor={`address-${address.id}`}
                      className="text-lg flex flex-col font-mier-book ml-2"
                    >
                      {address.name} <br />
                      {address.address} <br />
                      {address.contact}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>

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
        <h3 className="text-xl font-mier my-1">Product Details (2) products</h3>
        <div className="flex-col flex rounded-md font-mier-demi text-slate-600 border gap-3 p-3">
          {/* Total Product Price */}
          <div className="flex text-lg justify-between">
            <h4>Total Product price</h4>
            <span>{cart.length} Quantity</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>

          {/* Total Discounts */}
          <div className="flex text-lg justify-between text-green-600 font-mier-demi">
            <h4>Total Discounts</h4>
            <span>₹ {(discountPercentage * totalPrice).toFixed(2)}</span>
          </div>

          <Separator />

          {/* Order Total */}
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
