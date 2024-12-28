import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "../components/ui/button"; // Import your custom Button from ShadCN
import { Input } from "../components/ui/input"; // Import your Input component
import { sendData } from "../utils/fetchData";
import { toast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSupplierInfo } from "../redux_store/supplierInfoSlice";
import { setIsLoggedIn } from "../redux_store/logInSlice";
// Validation schema for supplier registration
const validationSchema = Yup.object({
  companyName: Yup.string()
    .min(3, "Company name must be at least 3 characters")
    .max(100, "Company name cannot exceed 100 characters")
    .required("Company name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one letter and one number"
    )
    .required("Password is required"),
  vatNumber: Yup.string().required("VAT number is required"),
  contactPerson: Yup.object({
    firstname: Yup.string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name cannot exceed 50 characters")
      .required("First name is required"),
    lastname: Yup.string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name cannot exceed 50 characters")
      .required("Last name is required"),
  }),
});

const SupplierRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      companyName: "",
      email: "",
      password: "",
      vatNumber: "",
      contactPerson: { firstname: "", lastname: "" },
      mobile: window.sessionStorage.getItem("mobile") || "", // Retrieving mobile from session storage
    },
    validationSchema,
    validateOnBlur: true, // Enable validation on blur
    validateOnChange: true, // Enable validation on change
    onSubmit: async (values) => {
      try {
        const response = await sendData("supplier/register", values);
        formik.resetForm();
        toast({
          title: "Registration Successful",
          description: "You have successfully registered as a supplier.",
          type: "success",
        });
        localStorage.setItem("token", response.token);
        localStorage.setItem("supplier", response.supplier?._id);
        dispatch(setIsLoggedIn(true));
        dispatch(setSupplierInfo(response.supplier));
        navigate("/supplier/dashboard");
      } catch (error) {
        toast({
          title: "Registration Failed",
          description:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
          type: "error",
        });
      }
    },
  });

  return (
    <div className="bg-pink-50 min-h-screen mt-10 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
        <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Supplier Registration
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.companyName}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            ) : null}
          </div>

          <div className="mb-4">
            <Input
              type="text"
              name="vatNumber"
              placeholder="VAT Number"
              value={formik.values.vatNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {formik.touched.vatNumber && formik.errors.vatNumber ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.vatNumber}
              </div>
            ) : null}
          </div>

          {/* Contact Person */}
          <div className="mb-4">
            <h3 className="font-bold text-lg mb-2">Contact Person</h3>
            <Input
              type="text"
              name="contactPerson.firstname"
              placeholder="First Name"
              value={formik.values.contactPerson.firstname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
            {formik.touched.contactPerson?.firstname &&
            formik.errors.contactPerson?.firstname ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.contactPerson.firstname}
              </div>
            ) : null}

            <Input
              type="text"
              name="contactPerson.lastname"
              placeholder="Last Name"
              value={formik.values.contactPerson.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2"
            />
            {formik.touched.contactPerson?.lastname &&
            formik.errors.contactPerson?.lastname ? (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.contactPerson.lastname}
              </div>
            ) : null}
          </div>

          <Button
            type="submit"
            className="w-full bg-pink-500 text-white p-3 rounded-lg"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Registering..." : "Register"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SupplierRegistration;
