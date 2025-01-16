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
import { deleteData, getData, updateData } from "../utils/fetchData";
import { fetchSignedUrls } from "../utils/signedUrl";
import { toast } from "../components/ui/use-toast";
import { Bell, Loader, Pen, Trash } from "lucide-react";
import { convertTimeToCocale } from "../utils/convertTimeToLocale";
import SearchBar from "./SearchBar";

const SupplierProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedFields, setSelectedFields] = useState([]);
  const [fieldValues, setFieldValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const id = useSelector((state) => state.supplierInfo?.id);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getData(`products/product?supplierId=${id}`);
        const enrichedProducts = await Promise.all(
          response.products.map(async (product) => {
            const productImages = product?.product_images || [];
            console.log(product.product_images[0]);

            const signedUrls = await fetchSignedUrls(productImages);
            return { ...product, signedUrls };
          })
        );
        setProducts(enrichedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (id) fetchProducts();
  }, []);

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
      <div className="flex w-full justify-between items-center ">
        <SearchBar
          width="w-full"
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <div className="relative">
          <span className="bg-red-700 animate-pulse h-2 w-2 rounded-full absolute"></span>
          <Bell strokeWidth={1.25} size={20} />
        </div>
      </div>
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
            <TableHead>Mall verified</TableHead>
            <TableHead>Supplier</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <div className="flex justify-center items-center w-full h-24">
            <Loader className="animate-spin" /> Loading...
          </div>
        ) : (
          <TableBody>
            {products.length > 0 ? (
              products.map((product) => (
                <TableRow key={product._id} className="p-0 ">
                  <TableCell className=" p-0">
                    <img
                      src={product.signedUrls[0] || ""}
                      alt={product.name || "Product Image"}
                      className="w-12 h-14 object-cover rounded-sm"
                    />
                  </TableCell>
                  <TableCell className="line-clamp-2 overflow-hidden">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    {product.category_name || "No Category"}
                  </TableCell>
                  <TableCell>{product.min_catalog_price}</TableCell>
                  <TableCell>{product.available_stock}</TableCell>
                  <TableCell>
                    {convertTimeToCocale(product.createdAt)}
                  </TableCell>
                  <TableCell>
                    {convertTimeToCocale(product.updatedAt)}
                  </TableCell>
                  <TableCell>{product.popular ? "Yes" : "No"}</TableCell>
                  <TableCell>{product?.mall_verified ? "Yes" : "No"}</TableCell>
                  <TableCell>{product.supplier}</TableCell>
                  <TableCell className="flex gap-2 ">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Pen
                          size={18}
                          onClick={() => openEditDialog(product)}
                          className="cursor-pointer mt-2"
                        />
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
                                  className="border"
                                />
                              </div>
                            ))}
                            <Button
                              type="submit"
                              disabled={loading}
                              className="mt-3"
                            >
                              {loading ? "Updating..." : "Update"}
                            </Button>
                          </form>
                        </DialogContent>
                      )}
                    </Dialog>

                    <Trash
                      className="cursor-pointer mt-2"
                      size={18}
                      onClick={() => handleDeleteProduct(product._id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11}>No products found</TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default SupplierProduct;
