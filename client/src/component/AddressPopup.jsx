import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateData } from "../utils/fetchData";
import { DialogDescription } from "@radix-ui/react-dialog";
import { DialogTitle } from "../components/ui/dialog";
import { toast } from "../components/ui/use-toast";

const AddressPopup = ({ addressDetail = {}, title, description }) => {
  const formik = useFormik({
    initialValues: {
      name: addressDetail.name || "",
      contact: addressDetail.contact || "",
      street: addressDetail.street || "",
      city: addressDetail.city || "",
      state: addressDetail.state || "",
      pin: addressDetail.pin || "",
      landmark: addressDetail.landmark || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^\d+$/, "Contact must be a valid number")
        .required("Contact is required"),
      street: Yup.string().required("Street is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      pin: Yup.string()
        .matches(/^\d{6}$/, "Pin must be a 6-digit number")
        .required("Pin Code is required"),
    }),
    onSubmit: async (values) => {
      try {
        await updateData("user/address", { address: values });
        formik.resetForm();
        toast({
          title: "Address updated",
          description: "Your address has been successfully updated.",
          type: "success",
        });
      } catch (error) {
        toast({
          title: "Update failed",
          description: error.message || "An error occurred.",
          type: "error",
        });
      }
    },
  });

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="rounded-md px-5 text-white bg-fuchsia-600 hover:bg-fuchsia-700 py-2">
            {title}
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle className="text-center text-xl font-mier-bold">
            {title}
          </DialogTitle>
          <DialogDescription className="text-center mb-4">
            {description}
          </DialogDescription>
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <div className="grid gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter Name"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div className="grid grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="name">Contact</Label>
                <Input
                  id="contact"
                  name="contact"
                  value={formik.values.contact}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter contact number"
                />
                {formik.touched.contact && formik.errors.contact && (
                  <p className="text-red-500">{formik.errors.contact}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="landmark">LandMark</Label>
                <Input
                  id="landmark"
                  name="landmark"
                  value={formik.values.landmark}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter landmark"
                />
                {formik.touched.landmark && formik.errors.landmark && (
                  <p className="text-red-500">{formik.errors.landmark}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="name">Street</Label>
                <Input
                  id="street"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter street"
                />
                {formik.touched.street && formik.errors.street && (
                  <p className="text-red-500">{formik.errors.street}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter city"
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500">{formik.errors.city}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="pin">Pin</Label>
                <Input
                  id="pin"
                  name="pin"
                  value={formik.values.pin}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter pin"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500">{formik.errors.name}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Enter state"
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-red-500">{formik.errors.state}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="rounded-md px-5 text-white bg-fuchsia-700 hover:bg-fuchsia-800 py-3"
            >
              Submit address
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressPopup;