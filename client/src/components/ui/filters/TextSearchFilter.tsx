import { useState, useEffect, useCallback } from "react";
import { useQueryState } from "nuqs";
import { useDebounce } from "@/hooks/useDebounce";
import Input from "../Input";
import { CircleXIcon } from "lucide-react";

type TextSearchFilterProps = {
  placeholder?: string;
  className?: string;
  paramName?: string;
};

const TextSearchFilter = ({
  placeholder = "Search...",
  className = "",
  paramName = "search",
}: TextSearchFilterProps) => {
  const [search, setSearch] = useQueryState(paramName, {
    defaultValue: "",
  });

  const [inputValue, setInputValue] = useState(search || "");
  const debouncedValue = useDebounce(inputValue, 500);

  // Update URL when debounced value changes
  useEffect(() => {
    if (debouncedValue !== search) {
      setSearch(debouncedValue || null);
    }
  }, [debouncedValue, search, setSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className={`${className} relative`}>
      <Input
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        size="sm"
      />
      <CircleXIcon
        onClick={() => setInputValue("")}
        className="w-5 h-5 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default TextSearchFilter;
