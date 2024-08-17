import React, { useState, useEffect } from "react";
import { Separator } from "../components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { filterData } from "../utils/constant";
import SearchBar from "./SearchBar";
import CategoryWithMore from "./CategoryWithMore";

const FilterBar = ({ products, setFilterProduct }) => {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [searchInput, setSearchInput] = useState("");

  // Apply filters whenever selectedFilters or products change
  useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters, products]);

  const handleFilterChange = (filterCategory, filterValue) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (!newFilters[filterCategory]) {
        newFilters[filterCategory] = [];
      }

      if (newFilters[filterCategory].includes(filterValue)) {
        newFilters[filterCategory] = newFilters[filterCategory].filter(
          (value) => value !== filterValue
        );
        // If the filter array for a category is empty, remove the category from the filters
        if (newFilters[filterCategory].length === 0) {
          delete newFilters[filterCategory];
        }
      } else {
        newFilters[filterCategory].push(filterValue);
      }

      return newFilters;
    });
  };

  const applyFilters = (filters) => {
    // If no filters are applied, show all products
    if (Object.keys(filters).length === 0) {
      setFilterProduct(products);
      return;
    }

    const filterArray = Object.keys(filters).map((key) => ({
      category: key,
      values: filters[key],
    }));

    const filteredProducts = products?.filter((product) => {
      return filterArray.every((filter) => {
        if (filter.category === "Category") {
          return filter.values.includes(product?.category?.name.toLowerCase());
        }
        if (filter.category === "Price") {
          return filter.values.some((value) => {
            const [min, max] = value.split("-").map(Number);
            return product?.price >= min && product?.price <= max;
          });
        }
        return true;
      });
    });

    setFilterProduct(filteredProducts);
  };

  return (
    <div className="w-full border rounded-md p-3">
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
                {data.title === "Category" && (
                  <SearchBar
                    width={"w-62"}
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                  />
                )}
                <CategoryWithMore
                  subCategory={data.subCategory}
                  searchInput={searchInput}
                  selectedFilters={selectedFilters}
                  onFilterChange={(filterValue) => {
                    handleFilterChange(data.title, filterValue);
                  }}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
