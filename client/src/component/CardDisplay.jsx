import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Cards from "./Cards";
const CardDisplay = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <div className="flex w-full flex-col justify-between lg:px-24 mt-[57px] md:px-3">
      <h4>Products for You</h4>
      <div className="flex">
        {!ismobile && <Sidebar />}
        <Cards width={"w-[76%]"} />
      </div>
    </div>
  );
};

export default CardDisplay;
