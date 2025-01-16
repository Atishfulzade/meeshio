import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import { sendData } from "../utils/fetchData";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [verifyEmail, setVerifyEmail] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifyLink = async () => {
      setLoading(true); // Show loading spinner
      if (!token) return; // Ensure token exists before making a request

      try {
        const response = await sendData("user/auth/verifymail", { token });
        setVerifyEmail(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false); // Hide loading spinner after request completes
    };

    verifyLink(); // Call the function
  }, [token]);

  return (
    <div className="text-center mt-48 h-screen w-full ">
      <h1 className="font-bold text-2xl">Welcome to email Verification</h1>
      {loading && <p>Please wait while we verify your email...</p>}
      {verifyEmail && (
        <p className="mt-20 bg-violet-900 p-5 w-full text-white text-center">
          {verifyEmail.message}
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
