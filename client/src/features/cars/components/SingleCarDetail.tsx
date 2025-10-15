import { useNavigate, useParams } from "react-router";
import { GET_CAR_BY_ID } from "../queries";
import { useMutation, useQuery } from "@apollo/client/react";
import type {
  GetCarByIdQuery,
  MutationDeleteCarArgs,
} from "@/generated/graphql";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { formatDate, formatPrice } from "@/lib/helpers";
import Button from "@/components/ui/Button";
import { getAuthState } from "@/lib/cookies";
import { DELETE_CAR } from "../mutations";

const SingleCarDetailBox = ({
  title,
  data,
}: {
  title: string;
  data: string | number;
}) => {
  return (
    <div className="p-2">
      <h3 className="text-sm font-medium text-gray-500 -mb-1">{title}</h3>
      <span className="text-base font-bold text-gray-900">{data}</span>
    </div>
  );
};

const SingleCarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<GetCarByIdQuery>(GET_CAR_BY_ID, {
    variables: { id },
  });

  const [deleteCar, { loading: deleteCarLoading, error: deleteCarError }] =
    useMutation<MutationDeleteCarArgs>(DELETE_CAR);

  const { isLoggedIn } = getAuthState();

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
              <SingleCarDetailBox
                title="Price"
                data={formatPrice(car?.price as number)}
              />
              <SingleCarDetailBox
                title="Registration"
                data={formatDate(car?.registrationDate as string)}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <SingleCarDetailBox
                title="Fuel Type"
                data={car?.fuel as string}
              />
              <SingleCarDetailBox
                title="Gears"
                data={car?.numberOfGears as number}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <SingleCarDetailBox
                title="Color"
                data={car?.color.colorName as string}
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <SingleCarDetailBox
                title="Color"
                data={car?.color.colorName as string}
              />
            </div>
          </div>
        </div>
      </div>

      {isLoggedIn && (
        <div className="border-b py-3 border-border flex gap-2 justify-end">
          <Button variant="primary" size="sm">
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              deleteCar({ variables: { id: car?.carId as string } });
              navigate("/cars");
            }}
          >
            {deleteCarLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      )}

      {deleteCarError && (
        <ErrorMessage error={deleteCarError} title="Failed to delete car" />
      )}
    </div>
  );
};

export default SingleCarDetail;
