import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashBoard from "../pages/DashBoard";
import SupplierProducts from "./SupplierProducts";

function SidebarWithTabs() {
  return (
    <div className="flex h-screen">
      <Tabs defaultValue="summary" className="flex w-full">
        {/* Sidebar */}
        <div className="md:w-[15%] pt-16 flex flex-col">
          <TabsList className="flex flex-col px-4 pt-20 space-y-2">
            <TabsTrigger
              value="summary"
              className="w-full text-left py-2 px-4  rounded hover:bg-gray-200"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="w-full text-left py-2 px-4  rounded hover:bg-gray-200"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="w-full text-left py-2 px-4  rounded hover:bg-gray-200"
            >
              Password
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-100">
          {/* Summary Content */}
          <TabsContent value="summary" className="">
            <DashBoard />
          </TabsContent>

          {/* Products Content */}
          <TabsContent
            value="products"
            className="p-6 flex items-center justify-center"
          >
            <SupplierProducts />
          </TabsContent>

          {/* Password Content */}
          <TabsContent
            value="password"
            className="p-6 flex items-center justify-center"
          >
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Update Password</CardTitle>
                <CardDescription>
                  Secure your account by updating your password.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Current Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">New Password</span>
                  <input
                    type="password"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200"
                  />
                </label>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default SidebarWithTabs;
