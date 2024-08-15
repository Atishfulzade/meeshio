import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Cards from "./Cards";
const CardDisplay = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <div className="flex w-full flex-col justify-between  mt-[57px]">
      <h4>Products for You</h4>
      <div className="flex justify-between">
        {!ismobile && <Sidebar />}
        <Cards width={"w-[80%]"} />
      </div>
    </div>
  );
};

export default CardDisplay;
