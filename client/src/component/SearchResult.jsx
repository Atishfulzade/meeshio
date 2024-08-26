import React from "react";

const SearchResult = ({ filteredResults }) => {
  return (
    <div className="w-full h-96 bg-white z-50 border rounded-sm absolute top-16 p-4 left-0 overflow-y-auto">
      {filteredResults?.length > 0 ? (
        filteredResults.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            {item.title}
          </div>
        ))
      ) : (
        <div className="px-4 py-2">No results found</div>
      )}
    </div>
  );
};

export default SearchResult;
