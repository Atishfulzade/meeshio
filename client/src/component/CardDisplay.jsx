import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import Cards from "./Cards";
const CardDisplay = () => {
  const ismobile = useSelector((state) => state.identifyMobile.isMobile);

  return (
    <div className="flex w-full justify-between lg:px-24 mt-[57px] md:px-3">
      {!ismobile && <Sidebar />}
      <Cards width={"w-[76%]"} />
    </div>
  );
};

export default CardDisplay;
