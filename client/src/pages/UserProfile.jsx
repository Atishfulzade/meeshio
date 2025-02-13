import React, { useEffect, useState, useCallback } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { MdVerified, MdOutlineEdit, MdOutlineAddCard } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TiHomeOutline } from "react-icons/ti";
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

  const fetchSignedImageUrl = async (key) => {
    try {
      const cleanedKey = key.replace("uploads/", "");
      const response = await getData(`images/${cleanedKey}`);
      return response.signedUrl;
    } catch (error) {
      console.error("Error fetching signed image URL:", error);
      return null;
    }
  };

  const fetchData = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
        variant: "success",
      });

      setUser(res.user);
      setIsEditing({ ...isEditing, profileImage: false });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong while updating the image.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardDetailsSubmit = async (values, { setSubmitting }) => {
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
        variant: "success",
      });

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
        variant: "error",
      });
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const deleteCard = async (cardId) => {
    try {
      const response = await deleteData("user/card", { cardId });
      setUser(response.user);
      toast({
        title: "Success",
        description: "Card deleted successfully",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the card. Try again.",
        variant: "error",
      });
    }
  };

  if (!user) return <Loader />;

  return (
    <div className="h-screen md:p-10 p-3">
      <div className="h-full py-8 rounded-lg">
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
              onClick={() => setIsEditing({ ...isEditing, profileImage: true })}
              className="absolute bottom-3 right-3"
            >
              <MdOutlineEdit size={16} />
            </Button>
          </div>
          <div className="flex flex-col">
            <p className="md:text-4xl text-2xl font-semibold text-slate-700 flex items-center">
              {user?.firstname} {user?.lastname}
              {user?.isVerified && (
                <MdVerified size={18} className="ml-3" color="green" />
              )}
            </p>
            <p className="text-sm text-stone-500">{user?.email}</p>
            <p className="text-sm text-stone-500">{user?.gender}</p>
          </div>
        </div>

        <AddressPopup
          addressDetail={user?.address}
          setUser={setUser}
          loading={loading}
          setLoading={setLoading}
        />

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
              <Button onClick={handleProfileImageSubmit}>
                {loading ? "Saving" : "Save Changes"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

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
              onSubmit={handleCardDetailsSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    name="cardNumber"
                    as={Input}
                    placeholder="Enter Card Number"
                  />
                  <Button type="submit" disabled={isSubmitting || loading}>
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
