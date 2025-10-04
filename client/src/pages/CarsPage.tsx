import TextSearchFilter from "@/components/ui/filters/TextSearchFilter";
import SortFilter from "@/components/ui/filters/SortFilter";
import ListCars from "@/features/cars/components/list-cars/ListCars";

const sortOptions = [
  { value: "carName-asc", label: "Name A-Z" },
  { value: "carName-desc", label: "Name Z-A" },
  { value: "price-asc", label: "Price Low-High" },
  { value: "price-desc", label: "Price High-Low" },
];

const CarsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">All Cars</h1>
      <div className="flex gap-4 bg-white p-4 mb-8 mt-4 border border-border rounded-md">
        <TextSearchFilter />
        <SortFilter
          paramName="sort"
          options={sortOptions}
          className="max-w-40"
        />
      </div>

      <ListCars />
    </>
  );
};

export default CarsPage;
