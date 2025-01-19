import React from "react";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { MdMobileFriendly } from "react-icons/md";
import { useSelector } from "react-redux";

const DashBoard = () => {
  const isMobile = useSelector((state) => state.identifyMobile.isMobile);
  return (
    <div className="mt-16">
      {isMobile && (
        <Alert>
          <MdMobileFriendly className="h-4 w-4" />
          <AlertTitle>Mobile Mode Detected!</AlertTitle>
          <AlertDescription>
            Switch to desktop mode for full features.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default DashBoard;
