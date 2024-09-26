import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MdVerified, MdOutlineEdit, MdOutlineAddCard } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa6";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegUser } from "react-icons/fa";
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
  const [imageURL, setImageURL] = useState();

  // Fetch user profile only on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData("user/profile");
        setUser(response);

        // Fetch image if profileImage is available
        if (response?.profileImage) {
          const imageUrl = await fetchSignedImageUrl(response.profileImage);
          setImageURL(imageUrl);
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };

    const fetchSignedImageUrl = async (key) => {
      const cleanedKey = key.replace("uploads/", "");
      console.log(cleanedKey);

      const response = await getData(`images/${cleanedKey}`);
      return response.signedUrl; // Adjust based on your API response structure
    };

    fetchData(); // Fetch profile once on mount
  }, []); // Empty dependency array ensures this only runs once when the component mounts

  // Handle Profile Image Update
  const handleProfileImageSubmit = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const token = localStorage.getItem("token");
      await updateData("user/profile", formData, token, true);

      toast({
        title: "Profile Image Updated",
        description: "Your profile image has been updated successfully.",
        type: "success",
      });

      // Re-fetch user data after successful update
      const updatedUser = await getData("user/profile");
      setUser(updatedUser);
      if (updatedUser?.profileImage) {
        const updatedImageUrl = await fetchSignedImageUrl(
          updatedUser.profileImage
        );
        setImageURL(updatedImageUrl);
      }
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
        title: "Address Updated",
        description: "Your address has been updated successfully.",
        type: "success",
      });

      // Update user data locally after successful update
      setUser((prevUser) => ({ ...prevUser, address: newAddress }));
      setIsEditing({ ...isEditing, address: false });
    } catch (error) {
      console.error("Error updating address:", error);
      toast({
        title: "Update Failed",
        description: "Something went wrong while updating the address.",
        type: "error",
      });
    }
  };

  const handleCardDetailsSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");
      const data = {
        cardNumber: values.cardNumber,
        cardholderName: values.cardholderName,
        expiryDate: values.expiryDate,
        cvv: values.cvv,
        userId: values.userId,
      };

      await sendData("user/card", data, token);

      toast({
        title: "Card Added",
        description: "Your new card details have been added successfully.",
        type: "success",
      });

      // Update user data locally after successful card addition
      setUser((prevUser) => ({
        ...prevUser,
        cards: [...(prevUser.cards || []), data],
      }));
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
      <div className="h-full shadow-lg py-8 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-lg text-slate-800 font-mier-bold border rounded-full px-4 border-slate-300 py-1 flex gap-2 items-center">
            <FaRegUser /> Profile
          </h2>
        </div>
        <div className="flex py-3 gap-3">
          <div className="mb-4 text-start flex relative w-36">
            <img
              src={imageURL}
              alt="Profile"
              className="w-20 h-20 rounded-full border object-cover p-1 border-fuchsia-500"
            />
            <Button
              variant="outlined"
              onClick={() => setIsEditing({ ...isEditing, profileImage: true })}
              className=" rounded-full w-fit bg-white border text-gray-800 shadow-md absolute bottom-1 right-10"
            >
              <MdOutlineEdit size={16} />
            </Button>
          </div>
          <div className="flex flex-col">
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

        {/* Address Section */}
        <div className="">
          <h2 className="text-lg text-slate-800 w-fit font-mier-bold border rounded-full px-4 border-slate-300 py-1 flex gap-2 items-center">
            <TiHomeOutline />
            Address
          </h2>
          <p className="flex flex-col py-5 ">
            <p className="font-mier-book">{user?.address?.street},</p>
            <p className="font-mier-book">
              {user?.address?.city}, {user?.address?.state}
            </p>
            <p className="font-mier-book"> {user?.address?.zipCode}</p>
          </p>
          <Button
            onClick={() => setIsEditing({ ...isEditing, address: true })}
            className="flex justify-center gap-2 items-center bg-fuchsia-500 hover:bg-fuchsia-600"
          >
            <MdOutlineEdit /> Edit Address
          </Button>
        </div>

        {/* Card Details Section */}
        <div className="mt-5">
          <h2 className="text-lg w-fit text-slate-800 font-mier-bold border rounded-full px-4 border-slate-300 py-1 flex gap-2 items-center">
            <MdOutlineAddCard />
            Card Details
          </h2>
          <div className=" flex gap-3 py-5">
            {user?.cards?.map((card, index) => (
              <div
                key={index}
                className="flex justify-center  flex-col border shadow-md p-3 rounded-md items-start "
              >
                <p className="font-mier-book">{card.cardholderName}</p>
                <p className="font-mier-book">
                  **** **** **** {card.cardNumber.slice(-4)}
                </p>
                <RiDeleteBin7Line
                  className="cursor-pointer"
                  onClick={() => {
                    /* Handle delete */
                  }}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={() => setIsEditing({ ...isEditing, cardDetails: true })}
            className="flex justify-center gap-2 items-center bg-fuchsia-500 hover:bg-fuchsia-600"
          >
            <FaRegCreditCard /> Add Card
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
              <DialogTitle>Edit Address</DialogTitle>
            </DialogHeader>
            <Formik
              initialValues={initialValues.address}
              validationSchema={Yup.object().shape(validationSchema.address)}
              onSubmit={handleAddressSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field name="street" component={Input} placeholder="Street" />
                  {errors.street && touched.street && (
                    <div>{errors.street}</div>
                  )}
                  <Field name="city" component={Input} placeholder="City" />
                  {errors.city && touched.city && <div>{errors.city}</div>}
                  <Field name="state" component={Input} placeholder="State" />
                  {errors.state && touched.state && <div>{errors.state}</div>}
                  <Field
                    name="zipCode"
                    component={Input}
                    placeholder="Zip Code"
                  />
                  {errors.zipCode && touched.zipCode && (
                    <div>{errors.zipCode}</div>
                  )}
                  <Field
                    name="contactNumber"
                    component={Input}
                    placeholder="Contact Number"
                  />
                  {errors.contactNumber && touched.contactNumber && (
                    <div>{errors.contactNumber}</div>
                  )}
                  <Button type="submit" className="mt-4">
                    Save Changes
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
              validationSchema={Yup.object().shape(validationSchema.card)}
              onSubmit={handleCardDetailsSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    name="cardNumber"
                    component={Input}
                    placeholder="Card Number"
                  />
                  {errors.cardNumber && touched.cardNumber && (
                    <div>{errors.cardNumber}</div>
                  )}
                  <Field
                    name="expiryDate"
                    component={Input}
                    placeholder="Expiry Date"
                  />
                  {errors.expiryDate && touched.expiryDate && (
                    <div>{errors.expiryDate}</div>
                  )}
                  <Field name="cvv" component={Input} placeholder="CVV" />
                  {errors.cvv && touched.cvv && <div>{errors.cvv}</div>}
                  <Field
                    name="cardholderName"
                    component={Input}
                    placeholder="Cardholder Name"
                  />
                  {errors.cardholderName && touched.cardholderName && (
                    <div>{errors.cardholderName}</div>
                  )}
                  <Field name="userId" type="hidden" value={user?._id} />
                  <Button type="submit" className="mt-4">
                    Add Card
                  </Button>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UserProfile;
