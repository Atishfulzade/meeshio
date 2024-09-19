import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MdVerified, MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAddCard } from "react-icons/md";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { getData, sendData, updateData } from "../utils/fetchData";
import { toast } from "../components/ui/use-toast";

// Validation schema for address and card details
const validationSchema = Yup.object({
  address: Yup.object({
    street: Yup.string().required("Street is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
    contactNumber: Yup.string().required("Contact number is required"),
  }),
  card: Yup.object({
    cardNumber: Yup.string().required("Card Number is required"),
    expiryDate: Yup.string().required("Expiry Date is required"),
    cvv: Yup.string().required("CVV is required"),
    cardholderName: Yup.string().required("Cardholder Name is required"),
    userId: Yup.string().required("User ID is required"),
  }),
});

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({
    profileImage: false,
    address: false,
    cardDetails: false,
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData("user/profile");
        setUser(response);
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    fetchData();
  }, [isEditing]);

  const handleProfileImageSubmit = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    try {
      const token = localStorage.getItem("token");
      await updateData("user/profile", formData, token, true);
      console.log(formData);

      toast({
        title: "Profile Image Updated",
        description: "Your profile image has been updated successfully.",
        type: "success",
      });
      setIsEditing({ ...isEditing, profileImage: false });
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast({
        title: "Update Failed",
        description: "Something went wrong while updating the image.",
        type: "error",
      });
    }
  };

  const handleAddressSubmit = async (newAddress) => {
    try {
      await updateData("user/address", { address: newAddress }, false);

      toast({
        title: "Address Added",
        description: "Your new address has been added successfully.",
        type: "success",
      });

      setIsEditing({ ...isEditing, address: false });
    } catch (error) {
      console.error("Error adding address:", error);
      toast({
        title: "Update Failed",
        description: "Something went wrong while adding the address.",
        type: "error",
      });
    }
  };

  const handleCardDetailsSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      // Format data according to the expected format
      const data = {
        cardNumber: values.cardNumber,
        cardholderName: values.cardholderName,
        expiryDate: values.expiryDate,
        cvv: values.cvv,
        userId: values.userId,
      };
      console.log(data);

      await sendData("user/card", data, token);

      toast({
        title: "Card Added",
        description: "Your new card details have been added successfully.",
        type: "success",
      });

      setIsEditing({ ...isEditing, cardDetails: false });
    } catch (error) {
      console.error("Error adding card details:", error);
      toast({
        title: "Update Failed",
        description: "Something went wrong while adding card details.",
        type: "error",
      });
    }
  };

  const initialValues = {
    address: {
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      state: user?.address?.state || "",
      zipCode: user?.address?.zipCode || "",
      contactNumber: user?.address?.contactNumber || "",
    },
    card: {
      cardNumber: user?.cardDetails?.cardNumber || "",
      expiryDate: user?.cardDetails?.expiryDate || "",
      cvv: user?.cardDetails?.cvv || "",
      cardholderName: user?.cardDetails?.cardholderName || "",
      userId: user?._id || "",
    },
  };

  return (
    <div className="h-screen px-6 mt-14">
      <div className="h-full shadow-lg p-6 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-slate-800 font-mier-bold flex gap-2 items-center">
            <FaRegUser /> Profile
          </h2>
        </div>
        <div className="flex py-5 gap-3">
          <div className="mb-4 text-start flex relative w-36">
            <img
              src={user?.profileImage || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border object-cover"
            />
            <Button
              variant="outlined"
              onClick={() => setIsEditing({ ...isEditing, profileImage: true })}
              className="mt-2 rounded-full bg-white border text-gray-800 shadow-md absolute bottom-3 right-1"
            >
              <MdOutlineEdit size={18} />
            </Button>
          </div>
          <div className=" flex flex-col">
            <p className="text-4xl font-mier-book flex items-center">
              {user?.firstname} {user?.lastname}
              {user?.isVerified && (
                <MdVerified size={18} className="ml-3" color="green" />
              )}
            </p>
            <p className="text-sm font-mier-demi text-stone-500">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-3 relative">
          <h2 className="text-lg text-slate-800 font-mier-bold flex gap-2 items-center">
            <TiHomeOutline />
            Address
          </h2>
          {user?.address ? (
            <div className="bg-fuchsia-200 rounded-md p-3 w-fit">
              <p>{user.address.street}</p>
              <p>
                {user.address.city}, {user.address.state} {user.address.zipCode}
              </p>
              <p>Contact Number: {user.address.contactNumber}</p>
            </div>
          ) : (
            <p>No address provided</p>
          )}
          <Button
            onClick={() => setIsEditing({ ...isEditing, address: true })}
            className="right-20 absolute font-mier-demi flex gap-2 w-fit bg-fuchsia-600 hover:bg-fuchsia-700"
          >
            <MdOutlineEdit size={20} /> Update Address
          </Button>
        </div>

        <div className="mb-4 flex flex-col gap-4 relative">
          <h2 className="text-lg text-slate-800 font-mier-bold flex gap-2 items-center">
            <FaRegCreditCard />
            Card Details
          </h2>
          <div className="flex gap-2 flex-wrap">
            {user?.cards && user.cards.length > 0 ? (
              user.cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-fuchsia-200 relative p-3 rounded-md "
                >
                  <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
                  <p>Name: {card.cardholderName}</p>
                  <p>Expiry Date: {card.expiryDate}</p>
                  <RiDeleteBin7Line className="bg-white h-7 w-7 p-1 absolute right-3 bottom-1 cursor-pointer shadow-md hover:scale-105 transition-all rounded-full" />
                </div>
              ))
            ) : (
              <p>No card details provided</p>
            )}
          </div>
          <Button
            onClick={() => setIsEditing({ ...isEditing, cardDetails: true })}
            className="right-20 absolute font-mier-demi flex gap-2 w-fit bg-fuchsia-600 hover:bg-fuchsia-700"
          >
            <MdOutlineAddCard size={20} /> Add Card
          </Button>
        </div>

        {/* Profile Image Dialog */}
        <Dialog
          open={isEditing.profileImage}
          onOpenChange={() =>
            setIsEditing({ ...isEditing, profileImage: false })
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => e.preventDefault()}>
              <Input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <Button
                type="button"
                className="mt-4"
                onClick={handleProfileImageSubmit}
              >
                Save Changes
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Address Dialog */}
        <Dialog
          open={isEditing.address}
          onOpenChange={() => setIsEditing({ ...isEditing, address: false })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
            </DialogHeader>
            <Formik
              initialValues={initialValues.address}
              validationSchema={validationSchema.shape.address}
              onSubmit={async (values) => {
                await handleAddressSubmit(values);
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    type="text"
                    name="street"
                    placeholder="Street"
                    as={Input}
                  />
                  <Field
                    type="text"
                    name="city"
                    placeholder="City"
                    as={Input}
                  />
                  <Field
                    type="text"
                    name="state"
                    placeholder="State"
                    as={Input}
                  />
                  <Field
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    as={Input}
                  />
                  <Field
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    as={Input}
                  />
                  <Button type="submit" className="mt-4">
                    Save Address
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>

        {/* Card Details Dialog */}
        <Dialog
          open={isEditing.cardDetails}
          onOpenChange={() =>
            setIsEditing({ ...isEditing, cardDetails: false })
          }
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Card Details</DialogTitle>
            </DialogHeader>
            <Formik
              initialValues={initialValues.card}
              validationSchema={validationSchema.shape.card}
              onSubmit={handleCardDetailsSubmit}
              enableReinitialize
            >
              <Form>
                <Field name="cardNumber" as={Input} placeholder="Card Number" />
                <Field
                  name="expiryDate"
                  as={Input}
                  placeholder="Expiry Date (MM/YY)"
                />
                <Field name="cvv" as={Input} placeholder="CVV" />
                <Field
                  name="cardholderName"
                  as={Input}
                  placeholder="Cardholder Name"
                />
                <Field
                  name="userId"
                  type="hidden"
                  value={initialValues.card.userId}
                />
                <Button type="submit" className="mt-4">
                  Save Card Details
                </Button>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
