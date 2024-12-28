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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "../components/ui/select";
import { MdMobileFriendly, MdOutlineDelete } from "react-icons/md";

import { sendData, getData, deleteData, updateData } from "../utils/fetchData";
import { useToast } from "@/components/ui/use-toast"; // Adjust the import path as necessary
import { useSelector } from "react-redux";
import { fetchSignedUrl } from "../utils/signedUrl";
import { logInSlice } from "../redux_store/logInSlice";
import { setSupplierInfo } from "../redux_store/supplierInfoSlice";
import { fetchSignedUrls } from "../utils/signedUrl";
const DashBoard = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [signedUrl, setSignedUrls] = useState([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category_id: "",
    category_name: "",
    available_stock: "",
    min_catalog_price: "",
    min_product_price: "",
    description: "",
    full_details: "",
    product_images: [],
    supplier: localStorage.getItem("supplier"),
    mall_verified: false,
    popular: false,
    assured_details: { is_assured: false, message: "Assured product" },
  });
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [editingProductId, setEditingProductId] = useState(null);
  const { toast } = useToast();
  const id = useSelector((state) => state.supplierInfo.id);
  const firstname = useSelector((state) => state.supplierInfo.firstname);
  const lastname = useSelector((state) => state.supplierInfo.lastname);
  const role = useSelector((state) => state.supplierInfo.role);
  const companyName = useSelector((state) => state.supplierInfo.companyName);
  const email = useSelector((state) => state.supplierInfo.email);
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  // Fetch categories and supplier info
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getData("category");
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchSupplier = async () => {
      try {
        const res = await getData(
          `supplier/profile/${localStorage.getItem("supplier")}`
        );
        setSupplierInfo(res);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    fetchSupplier();
    fetchCategories();
  }, []);

  // Handle product info change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  // Handle boolean select changes
  const handleBooleanSelect = (name, value) => {
    setProductInfo({ ...productInfo, [name]: value === "true" });
  };

  // Handle category selection for the product
  const handleCategorySelect = (categoryId) => {
    const selectedCategory = categories.find((cat) => cat._id === categoryId);
    setProductInfo({
      ...productInfo,
      category_id: selectedCategory._id,
      category_name: selectedCategory.name,
    });
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
      setProductInfo({ ...productInfo, product_images: imagePreviews });
    }
  };

  // Add product functionality
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (
      imageError ||
      productInfo.product_images.length < 3 ||
      productInfo.product_images.length > 8
    ) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    for (const [key, value] of Object.entries(productInfo)) {
      if (key === "product_images") {
        productInfo.product_images.forEach((image) =>
          formData.append("product_images", image.file)
        );
      } else {
        formData.append(key, value);
      }
    }

    try {
      await sendData("products", formData, true);
      toast({
        title: "Success",
        description: "Product has been added successfully!",
        variant: "success",
      });
      setProductInfo({
        name: "",
        category_id: "",
        category_name: "",
        available_stock: "",
        min_catalog_price: "",
        min_product_price: "",
        description: "",
        full_details: "",
        product_images: [],
        supplier: localStorage.getItem("supplier"),
        mall_verified: false,
        popular: false,
        assured_details: { is_assured: false, message: "Assured product" },
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
  useEffect(() => {
    const getSupplierProducts = async (req, res) => {
      try {
        const response = await getData(`products/product?supplierId=${id}`);
        setProducts(response?.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getSupplierProducts();
  }, []);
  // Delete product functionality
  const handleDeleteProduct = async (id) => {
    try {
      await deleteData(`products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully!",
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    const fetchSignedUrlImages = async (product) => {
      product?.map(async (image) => {
        const productImages = image?.product_images[0];
        console.log(productImages);

        const res = await fetchSignedUrls([...productImages]);
        setSignedUrls(res);
      });
    };
    fetchSignedUrlImages(products);
  }, []); // Fetch signed URLs only when `products` changes

  // Add category functionality
  const handleAddCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("profileImage", categoryImage[0]); // Ensure the first file is sent

    try {
      await sendData("category", formData);
      toast({
        title: "Success",
        description: "Category has been added successfully!",
        variant: "success",
      });
      setCategoryName("");
      setCategoryImage(null);
      setIsCategoryDialogOpen(false); // Close the category dialog
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category.",
        variant: "destructive",
      });
    }
  };
  const handleFieldSelection = (field) => {
    if (!selectedFields.includes(field)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFieldValues({
      ...fieldValues,
      [field]: value,
    });
  };

  // Open dialog for editing a specific product
  const openEditDialog = (product) => {
    setEditingProductId(product._id);
    setIsDialogOpen(true);
  };

  // Submit updated product
  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(`products/${editingProductId}`, fieldValues);
    toast({
      title: "Success",
      description: "Product has been updated successfully!",
      variant: "success",
    });
    setIsDialogOpen(false);
    setSelectedFields([]);
  };
  console.log(signedUrl);

  return (
    <div className="mt-16">
      {isMobile && (
        <Alert>
          <MdMobileFriendly className="h-4 w-4" />
          <AlertTitle>are you using mobile !</AlertTitle>
          <AlertDescription>
            Choose desktop mode to access all feature
          </AlertDescription>
        </Alert>
      )}
      <div className="flex p-3 bg-fuchsia-200 w-full justify-between items-center">
        <div className=" flex flex-col">
          <p className="font-mier-book whitespace-nowrap">
            Company: {companyName}
          </p>
          <p className="font-mier-book">Contact: {email}</p>
          <p className="font-mier-book">
            Authorised person: {firstname + " " + lastname}
          </p>
        </div>
        <div className="flex gap-5 flex-wrap justify-end">
          <Dialog
            open={isProductDialogOpen}
            onOpenChange={setIsProductDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Fill out the form below to add a new product.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct} className="flex flex-col gap-2">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    name="name"
                    value={productInfo.name}
                    onChange={handleProductChange}
                    required
                    className="border"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <div className="w-1/2">
                    <Label htmlFor="category_id">Category</Label>
                    <Select
                      onValueChange={handleCategorySelect}
                      value={productInfo.category_id} // Set the selected category's ID
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}{" "}
                            {/* Display the name, but store the ID */}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-1/2">
                    <Label htmlFor="available_stock">Available stock</Label>
                    <Input
                      name="available_stock"
                      type="number"
                      value={productInfo.available_stock}
                      onChange={handleProductChange}
                      required
                      className="border"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-1/2">
                    <Label htmlFor="min_catalog_price">
                      Minimum Catalog Price
                    </Label>
                    <Input
                      name="min_catalog_price"
                      type="number"
                      value={productInfo.min_catalog_price}
                      onChange={handleProductChange}
                      required
                      className="border"
                    />
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="min_product_price">
                      Minimum Product Price
                    </Label>
                    <Input
                      name="min_product_price"
                      type="number"
                      value={productInfo.min_product_price}
                      onChange={handleProductChange}
                      required
                      className="border"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    name="description"
                    value={productInfo.description}
                    onChange={handleProductChange}
                    className="border"
                  />
                </div>
                <div>
                  <Label htmlFor="full_details">Full Details</Label>
                  <Textarea
                    name="full_details"
                    value={productInfo.full_details}
                    onChange={handleProductChange}
                    className="border "
                  />
                </div>
                <div>
                  <Label htmlFor="product_images">
                    Product Images{" "}
                    <span className="text-xs">
                      (Select More than two images)
                    </span>
                  </Label>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelection}
                    required
                    className="border"
                  />
                  {imageError && <p className="text-red-500">{imageError}</p>}
                </div>
                <div className="flex w-full justify-between">
                  <div className="w-[30%] ">
                    <Label htmlFor="mall_verified">Mall Verified</Label>
                    <Select
                      onValueChange={(value) =>
                        handleBooleanSelect("mall_verified", value)
                      }
                      value={productInfo.mall_verified ? "true" : "false"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[30%] ">
                    <Label htmlFor="popular">Popular</Label>
                    <Select
                      onValueChange={(value) =>
                        handleBooleanSelect("popular", value)
                      }
                      value={productInfo.popular ? "true" : "false"}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[30%] ">
                    <Label htmlFor="is_assured">Assured</Label>
                    <Select
                      onValueChange={(value) =>
                        handleBooleanSelect("assured_details.is_assured", value)
                      }
                      value={
                        productInfo.assured_details?.is_assured
                          ? "true"
                          : "false"
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                    {productInfo?.assured_details?.is_assured && (
                      <div>
                        <Label htmlFor="assured_message">Assured Message</Label>
                        <Input
                          name="assured_message"
                          value={productInfo.assured_details.message}
                          onChange={(e) =>
                            setProductInfo({
                              ...productInfo,
                              assured_details: {
                                ...productInfo.assured_details,
                                message: e.target.value,
                              },
                            })
                          }
                          className="border"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding Product..." : "Add Product"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          {/* Add Category Button */}
          {role === "admin" && (
            <Dialog
              open={isCategoryDialogOpen}
              onOpenChange={setIsCategoryDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to add a new category.
                  </DialogDescription>
                </DialogHeader>
                <form
                  onSubmit={handleAddCategory}
                  className="flex flex-col gap-2"
                >
                  <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                      name="categoryName"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      required
                      className="border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryImage">Category Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setCategoryImage(e.target.files)}
                      required
                      className="border"
                    />
                  </div>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Adding Category..." : "Add Category"}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      <Card>
        <CardHeader>Products List</CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Trend</TableHead>
              <TableHead>Popular</TableHead>
              <TableHead>Shipping Charges</TableHead>
              <TableHead>Special Offers</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length > 0 ? (
              products.map((product, i) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={signedUrl[i]}
                      alt={product?.name}
                      className="w-12 h-12 object-cover"
                    />
                  </TableCell>
                  <TableCell>{product?.name}</TableCell>
                  <TableCell>
                    {product?.category_id?.name || "No Category"}
                  </TableCell>
                  <TableCell>{product?.min_catalog_price}</TableCell>
                  <TableCell>{product?.available_stock}</TableCell>
                  <TableCell>{product?.description}</TableCell>
                  <TableCell>{product?.trend || "N/A"}</TableCell>
                  <TableCell>{product?.popular ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {product?.shipping?.show_free_delivery
                      ? "Free Delivery"
                      : `₹${product?.shipping?.charges}`}
                  </TableCell>
                  <TableCell>
                    {product?.special_offers?.offers?.length > 0
                      ? product.special_offers.offers.map((offer, index) => (
                          <div key={index}>
                            <strong>{offer.type}:</strong> ₹{offer.amount}
                          </div>
                        ))
                      : "No Offers"}
                  </TableCell>
                  <TableCell>
                    {/* Edit Product Dialog */}
                    <Dialog
                      open={isDialogOpen && editingProductId === product._id}
                      onOpenChange={setIsDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="mr-5"
                          onClick={() => openEditDialog(product)}
                        >
                          <RiEditCircleLine size={18} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update product</DialogTitle>
                          <DialogDescription>
                            Select the fields of the product you want to update
                          </DialogDescription>
                        </DialogHeader>
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col gap-2"
                        >
                          <div className="w-full">
                            <Select onValueChange={handleFieldSelection}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Fields</SelectLabel>
                                  <SelectItem value="name">Name</SelectItem>
                                  <SelectItem value="available_stock">
                                    Available Stock
                                  </SelectItem>
                                  <SelectItem value="min_catalog_price">
                                    Price
                                  </SelectItem>
                                  <SelectItem value="description">
                                    Description
                                  </SelectItem>
                                  <SelectItem value="trend">Trend</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Render input fields dynamically based on selected fields */}
                          <div className="flex flex-col gap-4">
                            {selectedFields.map((field) => (
                              <div key={field}>
                                <Label htmlFor={field}>{field}</Label>
                                <Input
                                  name={field}
                                  value={fieldValues[field] || ""}
                                  onChange={(e) =>
                                    handleInputChange(field, e.target.value)
                                  }
                                  required
                                  className="border"
                                />
                              </div>
                            ))}
                          </div>

                          <Button type="submit" disabled={loading}>
                            {loading ? "Updating Product..." : "Update Product"}
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>

                    {/* Delete Product Button */}
                    <Button
                      variant="outline"
                      title="Delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      <MdOutlineDelete size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11}>No products found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DashBoard;
