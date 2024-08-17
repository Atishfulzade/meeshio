import React from "react";
import { IoIosClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const SearchBar = ({ width, searchInput, setSearchInput }) => {
  return (
    <div
      className={`mx-auto flex bg-white ${width} gap-1 rounded-md h-10  justify-normal border border-slate-500 px-2 items-center`}
    >
      <IoSearchOutline size={24} className="text-slate-500 " />
      <Input
        type="text"
        placeholder="Try Saree, Kurti or Search by Product Code"
        className="w-full h-full text-sm font-mier-book"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IoIosClose size={24} className="text-slate-600" />
    </div>
  );
};

export default SearchBar;
