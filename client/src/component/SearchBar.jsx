import React, { useEffect, useState, useCallback } from "react";
import { IoIosClose } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import SearchResult from "./SearchResult";
import { sendData } from "../utils/fetchData";
import { debounce } from "../App"; // Ensure debounce is properly imported

const SearchBar = React.memo(
  ({ width, searchInput, setSearchInput, showResult }) => {
    const [results, setResults] = useState([]); // Stores the API results
    const [filteredResults, setFilteredResults] = useState([]); // Filtered results for display
    const [showResults, setShowResults] = useState(false); // Controls the visibility of search results

    // Memoize the debounced search function to prevent re-creation on every render
    const debouncedFetchSearchResults = useCallback(
      debounce(async (input) => {
        try {
          if (input.length > 0 && showResult) {
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
      }, 500), // Adjust debounce delay as needed
      []
    );

    // Trigger the debounced function whenever `searchInput` changes
    useEffect(() => {
      if (searchInput.length > 0) {
        debouncedFetchSearchResults(searchInput);
      }
    }, [searchInput, debouncedFetchSearchResults]);

    // Filter results based on the current search input
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
      <div className="relative">
        <div
          className={`mx-auto flex bg-white ${width} gap-1 rounded-md h-10 justify-normal border border-slate-500 px-2 items-center`}
        >
          {/* Search Icon */}
          <IoSearchOutline size={24} className="text-slate-500" />

          {/* Input Field */}
          <Input
            type="text"
            placeholder="Try Saree, Kurti or Search by Product Code"
            className="w-full h-full text-sm font-mier-book"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)} // Delay allows selecting results
          />

          {/* Close Icon */}
          <IoIosClose
            size={24}
            className="text-slate-600 cursor-pointer"
            onClick={() => setSearchInput("")}
          />
        </div>

        {/* Search Results */}
        {showResults && showResult && searchInput.length > 0 && (
          <SearchResult results={filteredResults} />
        )}
      </div>
    );
  }
);

export default SearchBar;
