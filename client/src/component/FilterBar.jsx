import React, { useState } from "react";
import { Separator } from "../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { filterData } from "../utils/constant";
import SearchBar from "./SearchBar";

const FilterBar = () => {
  const ITEMS_TO_SHOW = 10;

  return (
    <div className="w-[300px] border rounded-md p-3">
      <div className="flex flex-col">
        <h4 className="text-slate-900 font-medium font-mier uppercase">
          Filters
        </h4>
        <p className="text-xs font-medium font-mier text-slate-500">
          1000+ Products
        </p>
        <Separator className="mt-3" />
      </div>
      <div className="flex flex-col">
        {filterData.map((data, index) => (
          <Accordion type="single" collapsible className="w-full" key={index}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>{data.title}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                {data.title === "Category" && <SearchBar width={"w-62"} />}
                <CategoryWithMore subCategory={data.subCategory} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const CategoryWithMore = ({ subCategory }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      {subCategory.slice(0, visibleCount).map((subData, i) => (
        <div className="flex items-center space-x-2" key={i}>
          <Checkbox id={`terms${i}`} />
          <label
            htmlFor={`terms${i}`}
            className="text-sm font-mier leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {subData.title}
          </label>
        </div>
      ))}
      {visibleCount < subCategory.length && (
        <button
          onClick={handleShowMore}
          className="text-sm text-blue-600 hover:underline"
        >
          More
        </button>
      )}
    </>
  );
};

export default FilterBar;
