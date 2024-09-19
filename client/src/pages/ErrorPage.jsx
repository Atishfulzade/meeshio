import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Function to handle going back to the homepage
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <h1 variant="h2" className="text-red-600">
            404
          </h1>
          <h2 variant="h4" className="text-gray-800">
            Page Not Found
          </h2>
        </CardHeader>
        <CardContent className="text-center">
          <h1 className="text-gray-600">
            Oops! The page you are looking for does not exist or has been moved.
          </h1>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleGoHome}
            className="bg-fuchsia-800 hover:bg-fuchsia-900"
          >
            Go to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorPage;
