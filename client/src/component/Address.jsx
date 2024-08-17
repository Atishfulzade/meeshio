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

const Address = ({ nextStep, prevStep }) => {
  // Dummy address data
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

  // State to store selected address
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (value) => {
    setSelectedAddress(value);
  };

  const proceedWithSelectedAddress = () => {
    if (selectedAddress) {
      nextStep();
    }
  };

  return (
    <div className="mt-5 h-[74vh] md:px-24 w-full justify-center gap-3 flex">
      <div className="flex flex-col gap-2 ">
        <span
          onClick={prevStep}
          className="absolute top-24 left-10 border p-2 rounded-full cursor-pointer"
        >
          <IoMdArrowBack />
        </span>
        <div className="flex justify-between ">
          <h3 className="text-xl font-mier">Address Details</h3>
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
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    defaultValue="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    defaultValue="@peduarte"
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
        <div className="flex flex-col gap-2 h-full overflow-x-auto">
          <div className="p-3">
            <RadioGroup
              value={selectedAddress}
              onValueChange={handleSelectAddress}
            >
              {addressDetail.map((address) => (
                <div
                  key={address.id}
                  className="flex border flex-col p-3 w-[400px] rounded-md gap-1 bg-slate-200 h-fit space-x-2 my-2"
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
      <Separator orientation="vertical" />
      <div className="flex flex-col w-96">
        <h3 className="text-xl font-mier my-1">Product Details (2) products</h3>
        <div className="flex-col flex rounded-md font-mier-demi text-slate-600 border gap-3 p-3">
          <div className="flex text-lg justify-between">
            <h4>Total Product price</h4> <span>2 Quantity</span>
            <span>₹ 846</span>
          </div>
          <div className="flex text-lg justify-between text-green-600 font-mier-demi">
            <h4>Total Discounts</h4> <span>- ₹86</span>
          </div>
          <Separator />
          <div className="flex text-lg justify-between font-mier-demi">
            <h4>Order Total</h4> <span>₹ 846</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;