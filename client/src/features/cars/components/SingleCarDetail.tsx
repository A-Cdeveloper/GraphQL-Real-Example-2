import { useParams } from "react-router";
import { GET_CAR_BY_ID } from "../queries";
import { useQuery } from "@apollo/client/react";
import type { GetCarByIdQuery } from "@/generated/graphql";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";

const SingleCarDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<GetCarByIdQuery>(GET_CAR_BY_ID, {
    variables: { id },
  });

  if (loading) return <Loading size="lg" className="py-8" />;
  if (error) return <ErrorMessage error={error} title="Failed to load car" />;

  const car = data?.getCarById;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="aspect-[4/3] overflow-hidden bg-white p-2 border border-border">
        <img
          src={car?.imageUrl || "/images/bmw-8series-coupe-modellfinder.png"}
          alt={car?.carName}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">
          {car?.brand.brandName} {car?.carName}
        </h1>
        <p>Color: {car?.color.colorName}</p>
        <p>Price: {car?.price}</p>
        <p>Fuel: {car?.fuel}</p>
        <p>Door: {car?.door}</p>
        <p>Registration Date: {car?.registrationDate}</p>
        <p>Number of Gears: {car?.numberOfGears}</p>
      </div>
    </div>
  );
};

export default SingleCarDetail;
