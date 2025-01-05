import React, { useEffect, useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { RiEditCircleLine } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSelector } from "react-redux";
import { MdOutlineDelete } from "react-icons/md";
import { getData, updateData } from "../utils/fetchData";
import { fetchSignedUrls } from "../utils/signedUrl";
import { toast } from "../components/ui/use-toast";

const SupplierProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [loading, setLoading] = useState(false);
  const id = useSelector((state) => state.supplierInfo?.id);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getData(`products/product?supplierId=${id}`);
        const enrichedProducts = await Promise.all(
          response.products.map(async (product) => {
            const productImages = product?.product_images || [];
            const signedUrls = await fetchSignedUrls(productImages);
            return { ...product, signedUrls };
          })
        );
        setProducts(enrichedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (id) fetchProducts();
  }, [id]);

  // Handle field selection for editing
  const handleFieldSelection = (field) => {
    if (!selectedFields.includes(field)) {
      setSelectedFields([...selectedFields, field]);
    }
  };

  // Handle input value change dynamically
  const handleInputChange = (field, value) => {
    setFieldValues({ ...fieldValues, [field]: value });
  };

  // Open dialog for editing product
  const openEditDialog = (product) => {
    setEditingProduct(product);
    setSelectedFields([]);
    setFieldValues({});
  };

  // Submit updated product data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateData(`products/${editingProduct._id}`, fieldValues);
      toast({
        title: "Success",
        description: "Product updated successfully!",
        variant: "success",
      });
      setEditingProduct(null);
      setSelectedFields([]);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await deleteData(`products/${productId}`); // Assuming `deleteData` utility
      setProducts(products.filter((product) => product._id !== productId));
      toast({
        title: "Deleted",
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
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Popular</TableHead>
            <TableHead>Shipping Charges</TableHead>
            <TableHead>Special Offers</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img
                    src={product.signedUrls[0] || ""}
                    alt={product.name || "Product Image"}
                    className="w-12 h-12 object-cover"
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category_name || "No Category"}</TableCell>
                <TableCell>{product.min_catalog_price}</TableCell>
                <TableCell>{product.available_stock}</TableCell>
                <TableCell>{product.createdAt}</TableCell>
                <TableCell>{product.updatedAt}</TableCell>
                <TableCell>{product.popular ? "Yes" : "No"}</TableCell>
                <TableCell>{product.mall_verified || "No"}</TableCell>
                <TableCell>
                  {product.special_offers?.offers?.length > 0
                    ? product.special_offers.offers.map((offer, index) => (
                        <div key={index}>
                          <strong>{offer.type}:</strong> ₹{offer.amount}
                        </div>
                      ))
                    : "No Offers"}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="mr-2"
                        onClick={() => openEditDialog(product)}
                      >
                        <RiEditCircleLine size={18} />
                      </Button>
                    </DialogTrigger>
                    {editingProduct && editingProduct._id === product._id && (
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Product</DialogTitle>
                          <DialogDescription>
                            Select fields to update
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                          <Select onValueChange={handleFieldSelection}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="name">Name</SelectItem>
                                <SelectItem value="available_stock">
                                  Stock
                                </SelectItem>
                                <SelectItem value="min_catalog_price">
                                  Price
                                </SelectItem>
                                <SelectItem value="description">
                                  Description
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          {selectedFields.map((field) => (
                            <div key={field}>
                              <Label htmlFor={field}>{field}</Label>
                              <Input
                                name={field}
                                value={fieldValues[field] || ""}
                                onChange={(e) =>
                                  handleInputChange(field, e.target.value)
                                }
                              />
                            </div>
                          ))}
                          <Button type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Update"}
                          </Button>
                        </form>
                      </DialogContent>
                    )}
                  </Dialog>
                  <Button
                    variant="outline"
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
    </div>
  );
};

export default SupplierProduct;
