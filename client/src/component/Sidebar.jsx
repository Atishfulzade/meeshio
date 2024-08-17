import React from "react";
import { ComboboxDemo } from "../components/ui/combobox";
import FilterBar from "./FilterBar";

const Sidebar = ({ setFilterProduct, products }) => {
  return (
    <div className="w-[20%] flex flex-col gap-3 h-full max-h-screen ">
      <ComboboxDemo products={products} setFilterProduct={setFilterProduct} />
      <FilterBar products={products} setFilterProduct={setFilterProduct} />
    </div>
  );
};

export default Sidebar;
