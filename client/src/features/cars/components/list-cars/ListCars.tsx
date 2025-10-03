import { useQuery } from "@apollo/client/react";
import { GET_ALL_CARS } from "../../queries";

import type { Car, GetAllCarsQuery } from "@/generated/graphql";
import ListCarItem from "./ListCarItem";

const ListCars = () => {
  const { loading, error, data } = useQuery<GetAllCarsQuery>(GET_ALL_CARS, {
    variables: { limit: 10 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="flex justify-between bg-white p-4 mb-8 mt-4 border border-border rounded-md">
        <div>#filters</div>
        <div>
          Total: <span className="font-bold">{data?.getAllCars?.total}</span>
        </div>
      </div>
      <div className="border-b border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4">
        {data?.getAllCars?.items?.map((car) => (
          <ListCarItem key={car.carId} car={car as Car} />
        ))}
      </div>
    </div>
  );
};

export default ListCars;
