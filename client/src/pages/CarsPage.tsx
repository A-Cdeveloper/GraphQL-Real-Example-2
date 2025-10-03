import ListCars from "@/features/cars/components/list-cars/ListCars";
import SearchFilter from "@/components/ui/filters/SearchFilter";

const CarsPage = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">All Cars</h1>
      <div className="flex justify-between bg-white p-4 mb-8 mt-4 border border-border rounded-md">
        <SearchFilter />
      </div>

      <ListCars />
    </>
  );
};

export default CarsPage;
