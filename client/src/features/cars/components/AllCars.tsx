import { useQuery } from "@apollo/client/react";
import { GET_ALL_CARS } from "../queries";
import type { GetAllCarsQuery } from "../../../generated/graphql";

const AllCars = () => {
  const { loading, error, data } = useQuery<GetAllCarsQuery>(GET_ALL_CARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>All Cars ({data?.getAllCars?.total})</h1>
      {data?.getAllCars?.items?.map((car) => (
        <div key={car.carId}>
          <h3>{car.carName}</h3>
          <p>Brand: {car.brand.brandName}</p>
          <p>Color: {car.color.colorName}</p>
        </div>
      ))}
    </div>
  );
};

export default AllCars;
