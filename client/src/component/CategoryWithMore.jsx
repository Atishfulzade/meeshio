import { useState } from "react";
import { Label } from "../components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const CategoryWithMore = ({
  subCategory,
  selectedFilters,
  searchInput,
  onFilterChange,
}) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  // Filter subcategories based on search input
  const filteredSubCategories = subCategory.filter((subData) =>
    subData.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      {filteredSubCategories.slice(0, visibleCount).map((subData, i) => (
        <div className="flex items-center space-x-2" key={i}>
          <Checkbox
            id={`terms${i}`}
            onClick={() => {
              onFilterChange(subData.title);
            }}
            checked={selectedFilters["Category"]?.includes(subData.title)}
          />
          <Label
            htmlFor={`terms${i}`}
            className="text-sm font-mier leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {subData.title}
          </Label>
        </div>
      ))}
      {visibleCount < filteredSubCategories.length && (
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

export default CategoryWithMore;
