import React, { useState, useMemo } from "react";
import { MdOutlineQrCode2 } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setUserInfo } from "../redux_store/userInfoSlice";
import { sendData } from "../utils/fetchData";
import { toast } from "../components/ui/use-toast";

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
        <MdOutlineQrCode2 size={200} />
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

const Payment = ({
  nextStep,
  totalPrice,
  discountPercentage,
  discountedPrice,
  prevStep,
}) => {
  const cart = useSelector((state) => state.userInfo.cart);
  const userId = useSelector((state) => state.userInfo.id);

  // Use memoization for the savedCards array
  const savedCards = useSelector((state) => state.userInfo.savedCard || []);
  const memoizedSavedCards = useMemo(() => savedCards, [savedCards]);
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  // Formik setup
  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
      userId: userId,
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, "Card number must be 16 digits.")
        .required("Card number is required."),
      nameOnCard: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name should contain only letters.")
        .required("Name on card is required."),
      expiryDate: Yup.string()
        .matches(
          /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
          "Expiry date must be in MM/YY format."
        )
        .required("Expiry date is required."),
    }),
    onSubmit: async (values) => {
      try {
        const newCardsArray = [...memoizedSavedCards, values];
        await sendData("user/card", values);
        dispatch(setUserInfo({ savedCard: newCardsArray }));

        // Close the dialog after submission
        setOpenDialog(false);
        formik.resetForm();
        toast({
          title: "Card saved successfully",
          description: "Card added successfully!",
          appearance: "success",
        });
      } catch (error) {
        toast({
          title: "Unable to save card",
          description: { error: error.message || "Failed to add card" },
          appearance: "success",
        });
      }
    },
  });

  return (
    <div className="mt-5 h-[86vh] md:px-24 justify-center gap-3 flex md:flex-row flex-col">
      <div className="flex flex-col md:w-1/2 gap-2 p-3 md:p-0">
        <span
          onClick={prevStep}
          className="absolute md:top-24 top-16 md:left-10 left-3 border p-2 rounded-full cursor-pointer"
        >
          <IoMdArrowBack />
        </span>
        <div className="flex flex-col border rounded-md p-3">
          <div className="flex justify-between">
            <h3 className="text-xl font-mier-book">Select Payment Method</h3>
            <img
              src={securePayment}
              alt="securePayment"
              className="w-16 h-fit select-none"
            />
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <span className="md:text-xl font-mier-book flex items-center gap-3">
                  <img
                    src={cardPayment}
                    alt="cardPayment"
                    className="md:h-7 md:w-7 h-6 w-6"
                  />
                  Card Payment
                </span>
              </AccordionTrigger>
              <AccordionContent className="md:text-lg text-fuchsia-600 font-mier-book">
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                  <DialogTrigger asChild>
                    <p className="cursor-pointer">Add credit/debit card</p>
                  </DialogTrigger>
                  <DialogContent
                    className="sm:max-w-[425px]"
                    aria-describedby="dialog-description"
                  >
                    <DialogHeader>
                      <DialogTitle>Add Card</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={formik.handleSubmit}
                      className="flex flex-col gap-4 py-4"
                    >
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cardNumber" className="text-right">
                          Card No.
                        </Label>
                        <Input
                          id="cardNumber"
                          {...formik.getFieldProps("cardNumber")}
                          className={`col-span-3 border ${
                            formik.touched.cardNumber &&
                            formik.errors.cardNumber
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="1234 5678 9012 3456"
                          maxLength={16}
                        />
                      </div>
                      {formik.touched.cardNumber &&
                        formik.errors.cardNumber && (
                          <p className="col-span-4 text-red-500">
                            {formik.errors.cardNumber}
                          </p>
                        )}

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nameOnCard" className="text-right">
                          Name on Card
                        </Label>
                        <Input
                          id="nameOnCard"
                          {...formik.getFieldProps("nameOnCard")}
                          className={`col-span-3 border ${
                            formik.touched.nameOnCard &&
                            formik.errors.nameOnCard
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="John Doe"
                        />
                      </div>
                      {formik.touched.nameOnCard &&
                        formik.errors.nameOnCard && (
                          <p className="col-span-4 text-red-500">
                            {formik.errors.nameOnCard}
                          </p>
                        )}

                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="expiryDate" className="text-right">
                          Card Expiry
                        </Label>
                        <Input
                          id="expiryDate"
                          {...formik.getFieldProps("expiryDate")}
                          className={`col-span-3 border ${
                            formik.touched.expiryDate &&
                            formik.errors.expiryDate
                              ? "border-red-500"
                              : ""
                          }`}
                          placeholder="MM/YY"
                        />
                      </div>
                      {formik.touched.expiryDate &&
                        formik.errors.expiryDate && (
                          <p className="col-span-4 text-red-500">
                            {formik.errors.expiryDate}
                          </p>
                        )}

                      <DialogFooter>
                        <Button type="submit">Save Card</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                {savedCards.map((cards, i) => (
                  <div>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2 bg-slate-100 p-3 rounded-md ">
                        <RadioGroupItem value={cards.cardNumber} id={`r${i}`} />
                        <Label htmlFor={`r${i}`}>{cards.cardNumber} </Label>
                      </div>
                    </RadioGroup>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <span className="md:text-xl font-mier-book flex items-center gap-3">
                  <img src={upi} alt="" className="md:h-7 md:w-7 h-6 w-6" /> UPI
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <QRCodePayment />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-col md:w-96 p-3">
        <h3 className="text-xl font-mier my-1">Product Details (2) products</h3>
        <div className="flex-col flex rounded-md font-mier-demi text-slate-600 border gap-3 p-3">
          <div className="flex text-lg justify-between">
            <h4>Total Product price</h4>
            <span>{cart?.length} Quantity</span>
            <span>₹ {totalPrice}</span>
          </div>
          <div className="flex text-lg justify-between">
            <h4>Discount</h4>
            <span>-₹ {(discountPercentage * totalPrice).toFixed(2)}</span>
          </div>
          <Separator orientation="horizontal" />
          <div className="flex justify-between text-lg font-mier">
            <h4>Total Amount</h4>
            <span>₹ {discountedPrice.toFixed(2)}</span>
          </div>
          <Button
            onClick={nextStep}
            className="w-full bg-fuchsia-700 text-white font-mier rounded-lg"
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
