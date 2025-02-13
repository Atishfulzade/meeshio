import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { BsShopWindow } from "react-icons/bs";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getData } from "../utils/fetchData";
import { DialogDescription, DialogTitle } from "../components/ui/dialog";
import { assured } from "../assets";

const ProductInfo = ({ productDetails }) => {
  const [supplierInfo, setSupplierInfo] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  document.title = productDetails?.name || productDetails;
  useEffect(() => {
    const fetchSupplierInfo = async () => {
      const response = await getData(
        `supplier/profile/${productDetails?.supplier}`
      );
      setSupplierInfo(response.supplier);
    };
    fetchSupplierInfo();
  }, []);

  return (
    <div className="h-full md:w-[50%] mt-8 md:mt-0 flex flex-col gap-3">
      {/* Product Title and Price */}
      <Card className="rounded-md border md:gap-2 md:p-3">
        <CardHeader className="p-1">
          <h3 className="font-mier-demi font-semibold text-2xl line-clamp-2 text-slate-500">
            {productDetails?.name}
          </h3>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-2 relative">
          <h3 className="text-3xl text-slate-700 font-mier-book font-medium">
            ₹{productDetails?.min_product_price}{" "}
            <span className="text-sm text-slate-700 line-through font-mier-book font-medium">
              {" "}
              ₹{productDetails?.min_catalog_price}
            </span>
          </h3>
          {productDetails?.assured_details?.is_assured && (
            <img
              src={assured}
              alt="assured"
              className="absolute w-8 right-5 top-0"
            />
          )}
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600">
            <span
              className={`${
                productDetails?.catalog_reviews_summary?.average_rating <= 2
                  ? "bg-red-500"
                  : "bg-green-50"
              } text-white px-3 py-1 rounded-full flex items-center gap-1`}
            >
              {productDetails?.catalog_reviews_summary?.average_rating}
              <FaStar fill="white" />
            </span>
            11548 Reviews
          </div>
          {productDetails?.shipping?.show_free_delivery && (
            <span className="bg-slate-200 px-3 h-fit w-fit py-1 rounded-full text-xs md:text-sm text-slate-700">
              Free Delivery
            </span>
          )}
          {productDetails.category_name && (
            <p className="font-mier-book">
              Category : {productDetails.category_name}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Select Size */}
      <Card className="rounded-md border md:p-3">
        <CardHeader className="p-2">
          <h3 className="text-lg font-semibold font-mier-bold text-slate-700">
            Select size
          </h3>
        </CardHeader>
        <CardContent className="flex gap-3 mt-1">
          <span className="py-1 px-3 border-2 cursor-pointer bg-fuchsia-200 rounded-full border-fuchsia-800 text-fuchsia-800">
            Free size
          </span>
        </CardContent>
      </Card>

      {/* Product Details */}
      <Card className="rounded-md border md:p-3">
        <CardHeader className="p-2">
          <h3 className="font-mier-bold text-slate-700">
            {productDetails?.description}
          </h3>
        </CardHeader>
        <CardContent className="text-pretty">
          <p>{productDetails?.full_details}</p>
          <p className="mt-3">Manufactured in India</p>
        </CardContent>
      </Card>

      {/* Sold By with Dialog */}
      <Card className="rounded-md border p-3">
        <CardHeader className="p-2">
          <h3 className="text-lg font-semibold font-mier-bold text-slate-700">
            Sold By
          </h3>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <BsShopWindow
            className="bg-blue-300 rounded-full h-16 w-16 p-3"
            fill="white"
          />
          <h4 className="text-xl uppercase font-mier-book font-semibold text-slate-700">
            {supplierInfo?.companyName}
          </h4>

          {/* Dialog Trigger Button */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border-fuchsia-800 ml-auto font-mier-bold text-lg text-fuchsia-800"
              >
                View Shop
              </Button>
            </DialogTrigger>
            <DialogContent className="p-4">
              <DialogTitle>Shop Details</DialogTitle>
              <DialogDescription>
                Detail Information about supplier.
              </DialogDescription>
              <p className="mt-2 font-mier-book">
                Company Name: {supplierInfo?.companyName}
              </p>
              <p className="mt-0 font-mier-book">
                Email: {supplierInfo?.email}
              </p>
              <p className="mt-0 font-mier-book">
                VatNumber: {supplierInfo?.vatNumber}
              </p>
              {/* Additional supplier details can be added here */}
            </DialogContent>
          </Dialog>
        </CardContent>

        <CardContent className="flex gap-10 text-xs md:text-sm text-slate-600">
          <div className="flex flex-col items-center gap-2 h-full">
            <span className="border-2 border-blue-200 text-blue-500 font-semibold flex items-center gap-1 px-3 py-1 rounded-full">
              3.6
              <FaStar fill="#3b82f6" />
            </span>
            11548 Ratings
          </div>
          <div className="flex flex-col text-lg font-mier-book items-center">
            444 <br /> Followers
          </div>
          <div className="flex flex-col text-lg font-mier-book items-center">
            515 <br /> Products
          </div>
        </CardContent>
      </Card>

      {/* Product Ratings & Reviews */}
      <Card className="rounded-md border p-3">
        <CardHeader className="p-2">
          <h3 className="text-lg font-semibold font-mier-bold text-slate-700">
            Product Ratings & Reviews
          </h3>
        </CardHeader>
        <CardContent className="flex md:flex-row flex-col md:justify-between items-center justify-center gap-2">
          <div className="flex md:flex-col flex-row items-center md:gap-1 gap-5 justify-center text-5xl text-green-500 w-[20%]">
            <h1 className="flex items-center gap-1">
              4.5 <FaStar size={24} />
            </h1>
            <div className="text-xs font-mier-demi text-slate-600">
              <p className="whitespace-nowrap">7562 Ratings</p>
              <p className="whitespace-nowrap">2663 Reviews</p>
            </div>
          </div>
          <div className="flex flex-col w-[80%] gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-20">Excellent</span>
              <Progress value={80} color="bg-green-500" className="w-full" />
              <span>3488</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-20">Very Good</span>
              <Progress value={60} color="bg-blue-500" className="w-full" />
              <span>3488</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-20">Good</span>
              <Progress value={40} color="bg-yellow-500" className="w-full" />
              <span>2345</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-20">Average</span>
              <Progress value={20} color="bg-orange-500" className="w-full" />
              <span>1234</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600 w-20">Poor</span>
              <Progress value={10} color="bg-red-500" className="w-full" />
              <span>567</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductInfo;
