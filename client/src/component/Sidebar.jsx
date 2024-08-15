import React from "react";
import { ComboboxDemo } from "../components/ui/combobox";
import FilterBar from "./FilterBar";

const Sidebar = () => {
  return (
    <div className="w-[20%] bg-yellow-800 flex flex-col gap-3  h-fit">
      <ComboboxDemo />
      <FilterBar />
    </div>
  );
};

export default Sidebar;
