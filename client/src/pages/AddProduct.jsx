import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getData, sendData } from "../utils/fetchData";
import { useToast } from "../components/ui/use-toast";
import { useFormik } from "formik";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";

const AddProduct = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      category_id: "",
      category_name: "",
      min_catalog_price: "",
      min_product_price: "",
      full_details: "",
      trend: "",
      popular: false,
      has_mrp: false,
      is_added_to_wishlist: false,
      assured_details: {
        is_assured: false,
        message: "",
      },
      supplier: localStorage.getItem("supplier") || null,
      mall_verified: false,
      average_rating: 1,
      product_images: [],
      available_stock: "",
    },
    onSubmit: async (values) => {
      if (imageError || values.product_images.length < 3) {
        toast({
          title: "Error",
          description: "Please select between 3 to 8 images.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (key === "product_images") {
          values.product_images.forEach((image) =>
            formData.append("product_images", image.file)
          );
        } else {
          formData.append(
            key,
            typeof value === "object" ? JSON.stringify(value) : value
          );
        }
      });

      try {
        await sendData("products", formData, true);
        toast({
          title: "Success",
          description: "Product added successfully!",
          variant: "success",
        });
        formik.resetForm();
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to add product.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getData("category");
        setCategories(res);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch categories.",
          variant: "destructive",
        });
      }
    };

    fetchCategories();
  }, []);

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
      formik.setFieldValue("product_images", imagePreviews);
    }
  };

  return (
    <div className="h-full w-full ">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <Input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Product Name"
          className="border"
        />

        {/* Category Selection */}
        <Select
          onValueChange={(value) => formik.setFieldValue("category_id", value)}
          value={formik.values.category_id}
        >
          <SelectTrigger className="border">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input
          name="category_name"
          value={formik.values.category_name}
          onChange={formik.handleChange}
          placeholder="Category Name"
          className="border"
        />
        <Input
          name="available_stock"
          value={formik.values.available_stock}
          onChange={formik.handleChange}
          placeholder="Available Stock"
          className="border"
        />

        {/* Numeric Fields */}
        <Input
          name="min_catalog_price"
          type="number"
          value={formik.values.min_catalog_price}
          onChange={formik.handleChange}
          placeholder="Min Catalog Price"
          className="border"
        />
        <Input
          name="min_product_price"
          type="number"
          value={formik.values.min_product_price}
          onChange={formik.handleChange}
          placeholder="Min Product Price"
          className="border"
        />

        {/* Textarea Fields */}
        <Textarea
          name="full_details"
          value={formik.values.full_details}
          onChange={formik.handleChange}
          placeholder="Full Product Details"
          className="border"
        />
        <Input
          name="trend"
          value={formik.values.trend}
          onChange={formik.handleChange}
          placeholder="Product Trend"
          className="border"
        />

        {/* Checkbox Fields */}
        <div className="flex gap-2 items-center ">
          <Checkbox
            id="popular"
            checked={formik.values.popular}
            onCheckedChange={(checked) =>
              formik.setFieldValue("popular", checked)
            }
          ></Checkbox>
          <Label htmlFor="popular">Popular</Label>
        </div>
        <div className="flex gap-2 items-center ">
          <Checkbox
            checked={formik.values.has_mrp}
            id="hasMRP"
            onCheckedChange={(checked) =>
              formik.setFieldValue("has_mrp", checked)
            }
          ></Checkbox>
          <Label htmlFor="hasMRP">Has MRP</Label>
        </div>
        <div className="flex gap-2 items-center ">
          <Checkbox
            id="whitelist"
            checked={formik.values.is_added_to_wishlist}
            onCheckedChange={(checked) =>
              formik.setFieldValue("is_added_to_wishlist", checked)
            }
          ></Checkbox>
          <Label htmlFor="whitelist">Add whitelist</Label>
        </div>
        {/* Image Upload */}
        <Input
          type="file"
          multiple
          onChange={handleImageSelection}
          accept="image/*"
          className="border"
        />
        {imageError && <div className="text-red-500">{imageError}</div>}

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Adding Product..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
