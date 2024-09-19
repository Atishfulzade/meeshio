// components/SearchResult.jsx
import React from "react";

const SearchResult = ({ results }) => {
  return (
    <div className="absolute bg-white border border-slate-300 rounded-md shadow-lg mt-32 w-full z-10">
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result.id}
            className="p-2 border-b border-slate-200 hover:bg-gray-100"
          >
            <p className="text-sm font-medium">{result.title}</p>
            <p className="text-xs text-gray-500">{result.description}</p>
          </div>
        ))
      ) : (
        <div className="p-2 m">No results found</div>
      )}
    </div>
  );
};

export default SearchResult;
