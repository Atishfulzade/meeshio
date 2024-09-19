import React, { useState } from "react";
import { Card } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

const SupplierPage = () => {
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({
    name: "",
    category_id: "",
    category_name: "",
    min_catalog_price: "",
    min_product_price: "",
    description: "",
    full_details: "",
    share_text: "",
    type: "",
    images: [],
  });
  const [imageError, setImageError] = useState("");

  const supplierProfile = {
    companyName: "ABC Suppliers",
    email: "abc@suppliers.com",
    photoUrl: "/path-to-supplier-photo.jpg",
  };

  // Handle product info change
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProductInfo({ ...productInfo, [name]: value });
  };

  // Handle image selection
  const handleImageSelection = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length < 3 || selectedImages.length > 8) {
      setImageError("Please select between 3 to 8 images.");
    } else {
      setImageError("");
      setProductInfo({ ...productInfo, images: selectedImages });
    }
  };

  // Add product functionality
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      imageError ||
      productInfo.images.length < 3 ||
      productInfo.images.length > 8
    ) {
      alert("Please select between 3 to 8 images.");
      return;
    }
    setProducts([...products, { ...productInfo, id: products.length + 1 }]);
    setProductInfo({
      name: "",
      category_id: "",
      category_name: "",
      min_catalog_price: "",
      min_product_price: "",
      description: "",
      full_details: "",
      share_text: "",
      type: "",
      images: [],
    });
  };

  // Edit product functionality (stub, you can expand this)
  const handleEditProduct = (id) => {
    alert(`Edit product with ID: ${id}`);
  };

  // Delete product functionality
  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="supplier-dashboard">
      {/* Supplier Info Section */}
      <div className="supplier-info">
        <Card>
          <CardHeader>
            <Avatar src={supplierProfile.photoUrl} />
            <p>{supplierProfile.companyName}</p>
            <p>{supplierProfile.email}</p>
          </CardHeader>
        </Card>
      </div>

      {/* Dialog to Add New Product */}
      <div className="add-product-section">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <Text>Add New Product</Text>
            </DialogHeader>
            <form onSubmit={handleAddProduct}>
              <Input
                label="Product Name"
                name="name"
                value={productInfo.name}
                onChange={handleProductChange}
                required
              />
              <Input
                label="Category ID"
                name="category_id"
                value={productInfo.category_id}
                onChange={handleProductChange}
              />
              <Input
                label="Category Name"
                name="category_name"
                value={productInfo.category_name}
                onChange={handleProductChange}
              />
              <Input
                type="number"
                label="Minimum Catalog Price"
                name="min_catalog_price"
                value={productInfo.min_catalog_price}
                onChange={handleProductChange}
              />
              <Input
                type="number"
                label="Minimum Product Price"
                name="min_product_price"
                value={productInfo.min_product_price}
                onChange={handleProductChange}
              />
              <Textarea
                label="Description"
                name="description"
                value={productInfo.description}
                onChange={handleProductChange}
                required
              />
              <Textarea
                label="Full Details"
                name="full_details"
                value={productInfo.full_details}
                onChange={handleProductChange}
              />
              <Textarea
                label="Share Text"
                name="share_text"
                value={productInfo.share_text}
                onChange={handleProductChange}
              />
              <Input
                label="Type"
                name="type"
                value={productInfo.type}
                onChange={handleProductChange}
              />

              {/* Custom Image Picker */}
              <p>Upload Images (3-8 images)</p>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelection}
              />
              {imageError && <p style={{ color: "red" }}>{imageError}</p>}
              <div className="image-preview">
                {productInfo.images.length > 0 &&
                  productInfo.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      style={{ width: "100px", margin: "5px" }}
                    />
                  ))}
              </div>

              <Button type="submit">Add Product</Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* List of Added Products */}
        <div className="product-list">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <p>{product.name}</p>
              </CardHeader>
              <div>
                <p>{product.description}</p>
                <p>Price: ${product.min_product_price}</p>
                <div>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Product ${index}`}
                      style={{ width: "100px" }}
                    />
                  ))}
                </div>
              </div>
              <div className="product-actions">
                <Button onClick={() => handleEditProduct(product.id)}>
                  Edit
                </Button>
                <Button onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierPage;
