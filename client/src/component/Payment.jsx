import React, { useState } from "react";
import { MdOutlineQrCode2 } from "react-icons/md";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../components/ui/button";
import { IoMdArrowBack } from "react-icons/io";
import { cardPayment, securePayment, upi } from "../assets";
import { Separator } from "@radix-ui/react-separator";
import { RiDiscountPercentLine } from "react-icons/ri";

const QRCodePayment = () => {
  const [showQR, setShowQR] = useState(false);

  const handleShowQR = () => {
    setShowQR(true);
  };

  return (
    <div className="flex flex-col bg-slate-200 p-3 rounded-md">
      <h2 className="flex text-sm items-center gap-2 text-fuchsia-700 font-mier-demi">
        <MdOutlineQrCode2 /> Scan and Pay
      </h2>
      <div className="flex justify-center items-center relative">
        <MdOutlineQrCode2 size={200} className="" />
        {!showQR && (
          <div className="absolute inset-0 bg-slate-400/0 backdrop-blur flex justify-center items-center">
            <Button
              className="bg-fuchsia-700 text-white rounded-md px-5 py-2"
              onClick={handleShowQR}
            >
              Show QR
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const Payment = ({ nextStep, prevStep }) => {
  return (
    <div className="mt-5 h-[86vh]  md:px-24 justify-center gap-3 flex md:flex-row flex-col">
      <div className="flex flex-col md:w-1/2 gap-2 p-3 md:p-0">
        <span
          onClick={prevStep}
          className="absolute md:top-24 top-16 md:left-10 left-3 border p-2 rounded-full cursor-pointer"
        >
          <IoMdArrowBack />
        </span>
        <div className="flex flex-col border rounded-md p-3">
          <div className="flex justify-between ">
            <h3 className="text-xl  font-mier-book">Select Payment Method</h3>
            <img
              src={securePayment}
              alt="securePayment"
              className="w-16 h-fit select-none"
            />
          </div>
          <div className="flex ">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="md:text-xl font-mier-book flex items-center gap-3">
                    {" "}
                    <img
                      src={cardPayment}
                      alt=""
                      className="md:h-7 md:w-7 h-6 w-6"
                    />{" "}
                    Card Payment
                  </span>
                </AccordionTrigger>
                <AccordionContent className="md:text-lg cursor-pointer text-fuchsia-600 font-mier-book">
                  Add Credit/Debit card{" "}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <span className="md:text-xl font-mier-book flex items-center gap-3">
                    {" "}
                    <img
                      src={upi}
                      alt=""
                      className="md:h-7 md:w-7 h-6 w-6"
                    />{" "}
                    UPI
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <QRCodePayment />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col md:w-96 p-3">
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

export default Payment;
