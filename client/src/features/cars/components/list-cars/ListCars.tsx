import type { Car } from "@/generated/graphql";
import ListCarItem from "./ListCarItem";
import { useCarList } from "../../hooks/useCarList";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";

const ListCars = () => {
  const { loading, error, data, loadMoreRef, carsToRender, hasMore } =
    useCarList();

  if (loading && !data) return <Loading size="lg" className="py-8" />;
  if (error) return <ErrorMessage error={error} title="Failed to load cars" />;

  return (
    <div>
      <div className="flex justify-between bg-white p-4 mb-8 mt-4 border border-border rounded-md">
        <div>#filters</div>
        <div>
          Total: <span className="font-bold">{data?.getAllCars?.total}</span>
        </div>
      </div>
      <div className="border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4">
        {carsToRender.map((car) => (
          <ListCarItem key={car.carId} car={car as Car} />
        ))}
        {hasMore && (
          <div
            ref={loadMoreRef}
            className="col-span-full flex justify-center py-4"
          >
            {loading ? "Loading more cars..." : "Scroll for more cars"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCars;
