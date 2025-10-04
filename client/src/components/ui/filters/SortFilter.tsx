import { useQueryState } from "nuqs";
import Select from "../Select";

type SortFilterProps = {
  paramName: string;
  options: { value: string; label: string }[];
  className?: string;
};

const SortFilter = ({ paramName, options, className }: SortFilterProps) => {
  const [sortField, setSortField] = useQueryState(paramName, {
    defaultValue: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value || null);
  };

  return (
    <Select
      value={sortField || ""}
      onChange={handleChange}
      placeholder="Sort by..."
      size="sm"
      className={className}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default SortFilter;
