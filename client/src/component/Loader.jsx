import React from "react";
import img from "/favicon.jpg";
const Loader = () => {
  return (
    <div className="flex h-screen w-full  justify-center items-center bg-white backdrop-blur ">
      <img src={img} alt="Loading" className="h-10 w-10 animate-ping" />
    </div>
  );
};

export default Loader;
