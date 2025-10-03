import type { Car } from "@/generated/graphql";
import { formatPrice } from "@/lib/helpers";
import { Link } from "react-router";
const ListCarItem = ({ car }: { car: Car }) => {
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
      <Link
        to={`/cars/${car.carId}`}
        className=" bg-primary hover:bg-primary/80 py-2 text-white text-center rounded-md"
      >
        View Details
      </Link>
    </div>
  );
};

export default ListCarItem;
