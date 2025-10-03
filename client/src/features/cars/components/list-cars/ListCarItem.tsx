import type { Car } from "@/generated/graphql";
import { formatPrice } from "@/lib/helpers";
import { routes } from "@/providers/router/routes";
import { Link, useNavigate } from "react-router";
import Button from "@/components/ui/Button";
const ListCarItem = ({ car }: { car: Car }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-2 border border-border space-y-4 flex flex-col">
      <div className="aspect-[4/3] overflow-hidden">
        <Link to={`/cars/${car.carId}`}>
          <img
            src={car.imageUrl || "/images/bmw-8series-coupe-modellfinder.png"}
            alt={car.carName}
            className="w-full h-full object-cover scale-100 hover:scale-110 transition-all duration-300"
          />
        </Link>
      </div>
      <div className="px-2">
        <Link to={`/cars/${car.carId}`}>
          <h3 className="text-lg font-bold">
            {car.brand.brandName} {car.carName}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          Price:
          <span className="font-bold text-md">
            {formatPrice(car.price as number)}
          </span>
        </div>
      </div>
      <Button
        variant="primary"
        size="lg"
        onClick={() => navigate(routes.singleCar.replace(":id", car.carId))}
        className="rounded-none"
      >
        View Details
      </Button>
    </div>
  );
};

export default ListCarItem;
