import React, { useEffect, useState, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import SearchResult from "./SearchResult";
import { sendData } from "../utils/fetchData";
import { debounce } from "../App"; // Assuming you have debounce defined in your App

const SearchBar = React.memo(({ width, searchInput, setSearchInput }) => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Memoize the debounced search function
  const debouncedFetchSearchResults = useCallback(
    debounce(async (input) => {
      try {
        if (input.length > 0) {
          const response = await sendData("products/search", {
            search: input,
          });
          setResults(response);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }, 300), // Set debounce delay to 300ms or adjust as needed
    []
  );

  useEffect(() => {
    if (searchInput.length > 0) {
      debouncedFetchSearchResults(searchInput); // Pass the input to debounced function
    }
  }, [searchInput, debouncedFetchSearchResults]);

  useEffect(() => {
    if (searchInput.length > 0) {
      const filtered = results.filter((item) =>
        item.name?.toLowerCase()?.includes(searchInput.toLowerCase())
      );
      setFilteredResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  }, [searchInput, results]);

  return (
    <>
      <div
        className={`mx-auto flex bg-white ${width} gap-1 rounded-md h-10 justify-normal border border-slate-500 px-2 items-center`}
      >
        <IoSearchOutline size={24} className="text-slate-500" />
        <Input
          type="text"
          placeholder="Try Saree, Kurti or Search by Product Code"
          className="w-full h-full text-sm font-mier-book"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        <IoIosClose
          size={24}
          className="text-slate-600 cursor-pointer"
          onClick={() => setSearchInput("")}
        />
      </div>
      {searchInput.length > 0 && <SearchResult results={filteredResults} />}
    </>
  );
});

export default SearchBar;
