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
import { useToast } from "@/components/ui/use-toast"; // Adjust the import path as necessary

const DashBoard = () => {
  const [products, setProducts] = useState([]);
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageError, setImageError] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category_name: "",
    min_catalog_price: "",
    min_product_price: "",
    description: "",
    full_details: "",
    product_images: [],
    supplier: localStorage.getItem("supplier"),
  });
  const [imageURL, setImageURL] = useState(""); // State to store the signed image URL

  const { toast } = useToast(); // Initialize toast

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

    fetchCategories();
    fetchSupplier();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchSupplierProducts = async () => {
      try {
        const res = await getData(
          `products/product?supplierId=${localStorage.getItem("supplier")}`
        ); // Fetch products by supplier ID
        setProducts(res.products);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to fetch products.",
          variant: "destructive",
        });
      }
    };

    fetchSupplierProducts();
  }, []);

  // Fetch signed image URL for the first product image
  useEffect(() => {
    const fetchSignedImageUrl = async (key) => {
      const cleanedKey = key.replace("uploads/", ""); // Clean the key
      const response = await getData(`images/${cleanedKey}`); // Fetch signed URL
      return response.signedUrl; // Adjust based on your API response structure
    };

    if (products.length > 0 && products[0].product_images?.[0]) {
      fetchSignedImageUrl(products[0].product_images[0]).then(setImageURL);
    }
  }, [products]);

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
        category_name: "",
        min_catalog_price: "",
        min_product_price: "",
        description: "",
        full_details: "",
        product_images: [],
        supplier: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive",
      });
    }
  };

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

  return (
    <div className="supplier-dashboard mt-14">
      <div className="supplier-info flex gap-5">
        <Card>
          <CardHeader>
            <p>{supplierInfo?.companyName}</p>
            <p>{supplierInfo?.email}</p>
            <p>
              {supplierInfo?.contactPerson?.firstname}{" "}
              {supplierInfo?.contactPerson?.lastname}
            </p>
            <p>{supplierInfo?.vatNumber}</p>
          </CardHeader>
        </Card>
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
                  className="border"
                />
              </div>
              <div>
                <Label htmlFor="category_id">Category</Label>
                <Select
                  onValueChange={handleCategorySelect}
                  value={productInfo.category_id}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
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
                  className="border"
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
                  className="border"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
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
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelection}
                  required
                />
                {imageError && <p className="text-red-500">{imageError}</p>}
              </div>
              <Button type="submit">Add Product</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Min Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  src={imageURL} // Display the fetched signed URL
                  alt={product.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {
                  categories.find((cat) => cat._id === product.category_id)
                    ?.name
                }
              </TableCell>
              <TableCell>${product.min_product_price}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteProduct(product._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashBoard;
