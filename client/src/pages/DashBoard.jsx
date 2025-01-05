import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { RiEditCircleLine } from "react-icons/ri";
import { Label } from "@radix-ui/react-label";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { MdMobileFriendly } from "react-icons/md";

import { sendData, getData } from "../utils/fetchData";
import { useToast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category_id: "",
    available_stock: "",
    min_catalog_price: "",
    min_product_price: "",
    description: "",
    full_details: "",
    product_images: [],
    supplier: localStorage.getItem("supplier"),
    mall_verified: false,
    popular: false,
  });
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);

  const { toast } = useToast();
  const firstname = useSelector((state) => state.supplierInfo.firstname);
  const lastname = useSelector((state) => state.supplierInfo.lastname);
  const companyName = useSelector((state) => state.supplierInfo.companyName);
  const email = useSelector((state) => state.supplierInfo.email);
  const role = useSelector((state) => state.supplierInfo.role);
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);

  // Fetch categories and supplier info
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getData("category");
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast({
          title: "Error",
          description: "Failed to fetch categories.",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);

  // Handle product info change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    const selectedCategory = categories.find((cat) => cat._id === categoryId);
    setProductInfo((prev) => ({
      ...prev,
      category_id: selectedCategory?._id || "",
    }));
  };

  // Handle image selection
  const handleImageSelection = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length < 3 || selectedImages.length > 8) {
      setImageError("Please select between 3 to 8 images.");
    } else {
      setImageError("");
      const imagePreviews = selectedImages.map((image) => ({
        file: image,
        preview: URL.createObjectURL(image),
      }));
      setProductInfo((prev) => ({ ...prev, product_images: imagePreviews }));
    }
  };

  // Add product functionality
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (imageError || productInfo.product_images.length < 3) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    Object.entries(productInfo).forEach(([key, value]) => {
      if (key === "product_images") {
        productInfo.product_images.forEach((image) =>
          formData.append("product_images", image.file)
        );
      } else {
        formData.append(key, value);
      }
    });

    try {
      await sendData("products", formData, true);
      toast({
        title: "Success",
        description: "Product added successfully!",
        variant: "success",
      });
      setProductInfo({
        name: "",
        category_id: "",
        available_stock: "",
        min_catalog_price: "",
        min_product_price: "",
        description: "",
        full_details: "",
        product_images: [],
        supplier: localStorage.getItem("supplier"),
        mall_verified: false,
        popular: false,
      });
      setIsProductDialogOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-16">
      {isMobile && (
        <Alert>
          <MdMobileFriendly className="h-4 w-4" />
          <AlertTitle>Mobile Mode Detected!</AlertTitle>
          <AlertDescription>
            Switch to desktop mode for full features.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex p-3 bg-fuchsia-200 w-full justify-between items-center">
        <div className="flex flex-col">
          <p>Company: {companyName}</p>
          <p>Contact: {email}</p>
          <p>Authorized: {firstname + " " + lastname}</p>
        </div>
        <div className="flex gap-5">
          <Button
            className="bg-fuchsia-600 hover:bg-fuchsia-700"
            onClick={() => setIsProductDialogOpen(true)}
          >
            Add Product
          </Button>
          {role === "admin" && (
            <Button
              className="bg-fuchsia-600 hover:bg-fuchsia-700"
              onClick={() => setIsCategoryDialogOpen(true)}
            >
              Add Category
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
