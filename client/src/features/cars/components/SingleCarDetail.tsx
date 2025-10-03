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
    <div className=" pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="aspect-[4/3] overflow-hidden bg-white  border border-border shadow-sm p-2">
            <img
              src={
                car?.imageUrl || "/images/bmw-8series-coupe-modellfinder.png"
              }
              alt={car?.carName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-2 p-4">
          <div className="border-b border-border pb-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {car?.brand.brandName} {car?.carName}
            </h1>
            <p className="text-lg text-gray-600">
              {car?.fuel} • {car?.door} doors
            </p>
          </div>

          <div className="space-y-0">
            <div className="grid grid-cols-2 gap-2">
              <div className=" p-2 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Price
                </h3>
                <p className="text-xl font-semibold text-gray-900">
                  €{car?.price?.toLocaleString()}
                </p>
              </div>
              <div className=" p-2 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Registration
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {car?.registrationDate}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className=" p-2 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Fuel Type
                </h3>
                <p className="text-lg font-medium text-gray-900">{car?.fuel}</p>
              </div>
              <div className=" p-2 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Gears
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {car?.numberOfGears}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className=" p-2 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Color
                </h3>
                <p className="text-lg font-medium text-gray-900">
                  {car?.color.colorName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCarDetail;
