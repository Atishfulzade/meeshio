// components/SearchResult.jsx
import { Loader2 } from "lucide-react";
import React from "react";

const SearchResult = ({ results }) => {
  if (!results) {
    return <Loader2 />;
  }
  return (
    <div className="absolute bg-white border w-full border-slate-300 overflow-x-auto rounded-md shadow-lg  p-2 h-40 z-10">
      {results.length > 0 ? (
        results.map((result, i) => (
          <div
            key={i}
            className="p-2 border-b border-slate-200 hover:bg-gray-100"
          >
            <p className="text-sm font-medium cursor-pointer">{result.name}</p>
            {/* <p className="text-xs text-gray-500">{result.description}</p> */}
          </div>
        ))
      ) : (
        <div className="p-2 ">No results found</div>
      )}
    </div>
  );
};

export default SearchResult;
