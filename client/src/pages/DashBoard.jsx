import React, { useState, useEffect } from "react";
import { Card, CardHeader } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
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
} from "../components/ui/select";
import { sendData, getData, deleteData } from "../utils/fetchData";

const DashBoard = () => {
  const [products, setProducts] = useState([]);
  const [supplier, setSupplier] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category_id: "",
    min_catalog_price: "",
    min_product_price: "",
    description: "",
    full_details: "",
    product_images: [],
  });
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);

  // Fetch supplier data
  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const supplierId = JSON.parse(localStorage.getItem("supplier"))._id;
        const res = await getData(`supplier/${supplierId}`);
        setSupplier(res);
      } catch (error) {
        console.error("Error fetching supplier:", error);
      }
    };

    fetchSupplier();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getData("category");
        setCategories(res);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getData("products");
        setProducts(res.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle product info change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  // Handle category selection for the product
  const handleCategorySelect = (categoryId) => {
    setProductInfo({ ...productInfo, category_id: categoryId });
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

  // Cleanup URL objects on component unmount
  useEffect(() => {
    return () => {
      productInfo.product_images.forEach((image) =>
        URL.revokeObjectURL(image.preview)
      );
    };
  }, [productInfo.product_images]);

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

    // Create FormData instance
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
      const addedProduct = await sendData("products", formData, true);
      setProductInfo({
        name: "",
        category_id: "",
        min_catalog_price: "",
        min_product_price: "",
        description: "",
        full_details: "",
        product_images: [],
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Add new category with image
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (categoryName && categoryImage) {
      try {
        const categoryData = new FormData();
        categoryData.append("name", categoryName);
        categoryData.append("profileImage", categoryImage);

        await sendData("category", categoryData, true);
        const res = await getData("categories");
        setCategories(res);

        setCategoryName("");
        setCategoryImage(null);
      } catch (error) {
        console.error("Error adding category:", error);
      }
    } else {
      alert("Please provide a category name and image.");
    }
  };

  // Handle image upload for the new category
  const handleCategoryImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      setCategoryImage(imageFile);
    }
  };

  // Delete product functionality
  const handleDeleteProduct = async (id) => {
    try {
      await deleteData(`products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="supplier-dashboard mt-14">
      <div className="supplier-info flex gap-5">
        <Card>
          <CardHeader>
            <p>{supplier?.companyName}</p>
            <p>{supplier?.email}</p>
          </CardHeader>
        </Card>
        {supplier?.role === "Admin" && (
          <div className="add-category-section mt-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Category</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <h2>Add New Category</h2>
                </DialogHeader>
                <form onSubmit={handleAddCategory}>
                  <Label htmlFor="category_name">Category Name</Label>
                  <Input
                    name="category_name"
                    id="category_name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    className="border"
                  />
                  <Label htmlFor="category_image">Category Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="category_image"
                    onChange={handleCategoryImageUpload}
                    required
                    className="border"
                  />
                  {categoryImage && (
                    <img
                      src={URL.createObjectURL(categoryImage)}
                      alt="Category Preview"
                      style={{ width: "100px", margin: "10px 0" }}
                    />
                  )}
                  <Button type="submit" className="mt-4">
                    Add Category
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="absolute top-20 right-2">Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <h2 className="font-mier-bold font-semibold">Add New Product</h2>
            </DialogHeader>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-2">
              <div>
                <Label htmlFor="name">Product Name</Label>
                <Input
                  name="name"
                  value={productInfo.name}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category_id">Category</Label>
                <Select
                  onValueChange={handleCategorySelect}
                  defaultValue={productInfo.category_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="min_catalog_price">Minimum Catalog Price</Label>
                <Input
                  name="min_catalog_price"
                  type="number"
                  value={productInfo.min_catalog_price}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="min_product_price">Minimum Product Price</Label>
                <Input
                  name="min_product_price"
                  type="number"
                  value={productInfo.min_product_price}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  name="description"
                  value={productInfo.description}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="full_details">Full Details</Label>
                <Textarea
                  name="full_details"
                  value={productInfo.full_details}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="product_images">Product Images (3-8)</Label>
                <Input type="file" multiple onChange={handleImageSelection} />
                {imageError && <p className="text-red-500">{imageError}</p>}
                <div className="image-previews flex">
                  {/* {productInfo.product_images.map((image, index) => (
                    <img
                      key={index}
                      src={image.preview}
                      alt={`Product Preview ${index + 1}`}
                      style={{ width: "80px", margin: "10px" }}
                    />
                  ))} */}
                </div>
              </div>
              <Button type="submit" className="mt-4">
                Add Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <h2 className="font-mier-bold font-semibold">Products</h2>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  {
                    categories.find((cat) => cat._id === product.category_id)
                      ?.name
                  }
                </TableCell>
                <TableCell>${product.min_catalog_price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default DashBoard;
