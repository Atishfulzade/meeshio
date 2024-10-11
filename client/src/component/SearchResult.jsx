// components/SearchResult.jsx
import { Loader2 } from "lucide-react";
import React from "react";

const SearchResult = ({ results }) => {
  console.log(results);

  if (!results) {
    return <Loader2 />;
  }
  return (
    <div className="absolute bg-white border border-slate-300 rounded-md shadow-lg mt-52 p-2 w-full h-40 z-10">
      {results.length > 0 ? (
        results.map((result, i) => (
          <div
            key={i}
            className="p-2 border-b border-slate-200 hover:bg-gray-100"
          >
            <p className="text-sm font-medium">{result.title}</p>
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
