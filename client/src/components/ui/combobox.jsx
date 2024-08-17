import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const sortBy = [
  {
    value: "New arrivals",
    label: "New arrivals",
  },
  {
    value: "Price (High to Low)",
    label: "Price (High to Low)",
  },
  {
    value: "Price (Low to High)",
    label: "Price (Low to High)",
  },
  {
    value: "Ratings",
    label: "Ratings",
  },
  {
    value: "Discount",
    label: "Discount",
  },
];

export function ComboboxDemo({ products, setFilterProduct }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSort = (criteria) => {
    let sortedProducts = [...products];

    switch (criteria) {
      case "New arrivals":
        // Sort by newest arrivals, assuming there's a date or id field to determine recency
        sortedProducts.sort(
          (a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate)
        );
        break;

      case "Price (High to Low)":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case "Price (Low to High)":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case "Ratings":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;

      case "Discount":
        sortedProducts.sort(
          (a, b) => b.discountPercentage - a.discountPercentage
        );
        break;

      default:
        sortedProducts = [...products];
    }

    // Update the filtered products with the sorted products
    setFilterProduct(sortedProducts);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <p className="text-slate-600 font-mier text-[16px]">
            Sort by : &nbsp;
            {value ? (
              sortBy.find((item) => item.value === value)?.label
            ) : (
              <span className="text-slate-900">Relevance</span>
            )}
          </p>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {sortBy.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    handleSort(newValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
