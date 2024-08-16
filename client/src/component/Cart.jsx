import React, { useState } from "react";
import { Separator } from "../components/ui/separator";
import { product2 } from "../assets";
import { IoClose } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { HiPlus, HiMinusSm } from "react-icons/hi";
import { RiDiscountPercentLine } from "react-icons/ri";
import { Button } from "../components/ui/button";
const Cart = ({ nextStep, prevStep }) => {
  const [count, setCount] = useState(1);

  const increaseCount = () => {
    if (count < 10) setCount(count + 1);
  };
  const decreaseCount = () => {
    if (count > 1) setCount(count - 1);
  };
  return (
    <div className="mt-5 h-[86vh]  md:px-24 justify-center gap-3 flex">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-mier">Product Details</h3>
        <div className="flex flex-col gap-2 h-full overflow-x-auto">
          <div className="flex flex-col justify-between border w-[600px] min-w-[300px] rounded-md h-52">
            <div className="flex p-3">
              <img
                className="h-20 w-20 object-contain rounded-md border"
                src={product2}
                alt="Product Image"
              />
              <div className="flex flex-col w-full gap-1 ps-3">
                <h3 className="text-xl font-mier-demi text-slate-800 leading-5 flex-wrap line-clamp-2">
                  Product Name Product Name Product Name Product Name
                </h3>
                <p className="line-clamp-1 font-mier-book">
                  Product Description Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Tempore, nemo?
                </p>
                <div className="flex font-mier-demi w-full gap-4">
                  <span className="whitespace-nowrap">Price: $100</span>•
                  <span>Selected Size: Free</span>•
                  <div className="flex gap-2">
                    Quantity:
                    <div className="flex select-none flex-shrink-0 text-sm overflow-hidden justify-around items-center border h-8 w-32 rounded-md">
                      <HiMinusSm
                        onClick={decreaseCount}
                        className={`${
                          count <= 1
                            ? "cursor-not-allowed text-gray-400"
                            : "hover:bg-slate-200 cursor-pointer"
                        } w-[30%] h-8 p-2 active:bg-slate-300`}
                        disabled={count <= 1}
                      />
                      <span className="border-x-2 w-[40%] text-center">
                        {count}
                      </span>
                      <HiPlus
                        onClick={increaseCount}
                        className={`${
                          count >= 10
                            ? "cursor-not-allowed text-gray-400"
                            : "hover:bg-slate-200 cursor-pointer"
                        } w-[30%] h-8 p-2 active:bg-slate-300`}
                        disabled={count >= 10}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center font-mier-demi mt-2 justify-between cursor-pointer uppercase hover:text-slate-600">
                  <p className="flex items-center gap-2">
                    <FaRegEdit size={20} /> Edit
                  </p>
                  <p className="flex items-center gap-1">
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
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col w-96">
        <h3 className="text-xl font-mier my-1">Product Details (2) products</h3>
        <div className="flex-col flex rounded-md font-mier-demi text-slate-600 border gap-3 p-3 ">
          <div className="flex text-lg justify-between">
            <h4>Total Product price</h4> <span>2 Quantity</span>
            <span>₹ 846</span>
          </div>
          <div className="flex text-lg justify-between text-green-600 font-mier-demi">
            <h4 className=" ">Total Discounts</h4> <span>- ₹86</span>
          </div>
          <Separator />
          <div className="flex text-lg justify-between  font-mier-demi">
            <h4 className=" ">Order Total</h4> <span>₹ 846</span>
          </div>
          <div className="flex text-lg bg-green-200 p-2 text-green-700 rounded-md justify-center items-center gap-2  font-mier-demi">
            <RiDiscountPercentLine />
            Yay! Your total discount is ₹23
          </div>
          <p className="text-xs font-mier-demi">
            Clicking on 'Continue' will not deduct any money
          </p>
          <Button
            onClick={nextStep}
            className="flex text-lg bg-fuchsia-700 hover:bg-fuchsia-800 p-2 text-white rounded-md justify-center items-center gap-2  font-mier-demi"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
