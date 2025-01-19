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
import { deleteData, getData, sendData, updateData } from "../utils/fetchData";
import { toast } from "../components/ui/use-toast";
import AddressPopup from "../component/AddressPopup";
import Loader from "../component/Loader";
import { Loader2 } from "lucide-react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState({
    profileImage: false,
    address: false,
    cardDetails: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getData("user/profile");
        setUser(response);

        if (response?.profileImage) {
          const imageUrl = await fetchSignedImageUrl(response.profileImage);
          setImageURL(imageUrl);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
      setLoading(false);
    };

    const fetchSignedImageUrl = async (key) => {
      const cleanedKey = key.replace("uploads/", "");
      const response = await getData(`images/${cleanedKey}`);
      return response.signedUrl;
    };

    fetchData();
  }, []);

  const handleProfileImageSubmit = async () => {
    if (!imageFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("profileImage", imageFile);

    try {
      const res = await updateData("user/profile", formData);

      toast({
        title: res.message,
        description: "Your profile image has been updated successfully.",
        type: "success",
      });

      setUser(res.user);

      setIsEditing({ ...isEditing, profileImage: false });
      setLoading(false);
    } catch (error) {
      toast({
        title: error.message,
        description: "Something went wrong while updating the image.",
        type: "error",
      });
    }
  };

  const handleCardDetailsSubmit = async (values) => {
    setLoading(true);
    try {
      const data = {
        cardNumber: values.cardNumber,
        cardholderName: values.cardholderName,
        expiryDate: values.expiryDate,
        cvv: values.cvv,
        userId: values.userId,
      };

      await sendData("user/card", data);

      toast({
        title: "Card Added",
        description: "Your new card details have been added successfully.",
        type: "success",
      });

      setUser((prevUser) => ({
        ...prevUser,
        cards: [...(prevUser.cards || []), data],
      }));
      setIsEditing({ ...isEditing, cardDetails: false });
      setLoading(false);
    } catch (error) {
      console.error("Error adding card details:", error);
      toast({
        title: "Update Failed",
        description: "Something went wrong while adding card details.",
        type: "error",
      });
    }
  };
  const deleteCard = async (cardId) => {
    try {
      const response = await deleteData("user/card", { cardId: cardId });
      setUser(response.user);
      toast({
        title: "Card deleted successfully",
        description: "Card deleted successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (!user) return <Loader />;
  return (
    <div className="h-screen md:p-10 p-3 ">
      <div className="h-full  py-8 rounded-lg">
        <div className="flex py-3 gap-3 mt-5">
          <div className="mb-4 text-start flex relative w-36">
            {imageURL ? (
              <img
                src={imageURL}
                alt="Profile"
                className="w-32 h-32 rounded-full border object-cover p-1 border-fuchsia-500"
              />
            ) : (
              <Loader2 />
            )}
            <Button
              variant="outlined"
              onClick={() => setIsEditing({ ...isEditing, profileImage: true })}
              className=" rounded-full w-10 h-10 bg-white border text-gray-800 shadow-md absolute md:bottom-2 bottom-3 right-3"
            >
              <MdOutlineEdit size={16} />
            </Button>
          </div>
          <div className="flex flex-col">
            <p className="md:text-4xl text-2xl font-mier-bold font-semibold text-slate-700 flex items-center">
              {user?.firstname} {user?.lastname}
              {user?.isVerified && (
                <MdVerified size={18} className="ml-3" color="green" />
              )}
            </p>
            <p className="text-sm font-mier-demi text-stone-500">
              {user?.email}
            </p>
            <p className="text-sm font-mier-demi text-stone-500">
              {user.gender}
            </p>
            <p className="text-sm font-mier-demi text-stone-500">
              {user.address?.contact}
            </p>
            <p className="text-sm font-mier-demi text-stone-500">
              Member since 2019
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="relative">
          <h2 className="text-lg bg-slate-100 text-slate-700 font-mier-bold border rounded-full px-4 border-slate-300 py-1 flex gap-2 items-center">
            <TiHomeOutline />
            Address
          </h2>
          {user?.address && (
            <p className="flex flex-col py-5 ">
              <p className="font-mier-book">{user?.address?.landmark},</p>
              <p className="font-mier-book">{user?.address?.street},</p>
              <p className="font-mier-book">
                {user?.address?.city}, {user?.address?.state}
              </p>
              <p className="font-mier-book"> {user?.address?.pin}</p>
              <p className="font-mier-book">
                Contact: {user?.address?.contact}
              </p>
            </p>
          )}

          <AddressPopup
            addressDetail={user?.address}
            title=" Update"
            description={"Update your delivery address"}
            setUser={setUser}
            loading={loading}
            setLoading={setLoading}
          />
        </div>

        {/* Card Details Section */}
        <div className="mt-5 relative">
          <h2 className="text-lg bg-slate-100 text-slate-700 font-mier-bold border rounded-full px-4 border-slate-300 py-1 flex gap-2 items-center">
            <MdOutlineAddCard />
            Card Details
          </h2>
          <div className=" flex gap-3 my-5 ">
            {user?.cards?.map((card, index) => (
              <div
                key={index}
                className="group  bg-[url(./src/assets/credit-card.png)] bg-no-repeat bg-center rounded-md bg-cover h-20 relative w-32"
              >
                <p className="font-mier-book font-thin   absolute text-[10px] bottom-8 w-full left-4 text-white">
                  {card.cardholderName}
                </p>
                <div className="bg-orange-500 absolute bottom-1 ps-3 left-0 right-0">
                  <p className="font-mier-book text-xs ">
                    **** **** **** {card.cardNumber.slice(-4)}
                  </p>
                  <p className="text-[8px]">Expiry : {card.expiryDate}</p>
                </div>
                <RiDeleteBin7Line
                  className="cursor-pointer group-hover:block absolute text-white h-8 w-8 transition-all bg-violet-800 p-2 hidden rounded-full bottom-0 right-0"
                  onClick={() => {
                    deleteCard(card._id);
                  }}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={() => setIsEditing({ ...isEditing, cardDetails: true })}
            className="rounded-md border py-1 px-3 absolute top-12 right-0"
          >
            Add card{" "}
          </Button>
        </div>

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
                {loading ? "Saving" : "Save Changes"}
              </Button>
            </form>
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
              <DialogTitle>Add Card</DialogTitle>
            </DialogHeader>
            <Formik
              initialValues={{
                cardNumber: "",
                expiryDate: "",
                cvv: "",
                cardholderName: "",
                userId: user?._id || "",
              }}
              validationSchema={Yup.object({
                cardNumber: Yup.string().required("Card Number is required"),
                expiryDate: Yup.string().required("Expiry Date is required"),
                cvv: Yup.string().required("CVV is required"),
                cardholderName: Yup.string().required(
                  "Cardholder Name is required"
                ),
              })}
              onSubmit={(values, { setSubmitting }) => {
                handleCardDetailsSubmit(values);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label>Card Number</label>
                    <Field
                      name="cardNumber"
                      type="text"
                      as={Input}
                      placeholder="Enter Card Number"
                    />
                  </div>
                  <div>
                    <label>Expiry Date</label>
                    <Field
                      name="expiryDate"
                      type="text"
                      as={Input}
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <Field
                      name="cvv"
                      type="text"
                      as={Input}
                      placeholder="Enter CVV"
                    />
                  </div>
                  <div>
                    <label>Cardholder Name</label>
                    <Field
                      name="cardholderName"
                      type="text"
                      as={Input}
                      placeholder="Enter Cardholder Name"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="bg-fuchsia-500 hover:bg-fuchsia-600"
                  >
                    {loading ? "Adding..." : "Add Card"}
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
