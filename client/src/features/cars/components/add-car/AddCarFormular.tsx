import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import { useMutation } from "@apollo/client/react";
import { CREATE_CAR } from "../../mutations";
import { BRANDS } from "@/features/brands/constants";
import { COLORS } from "@/features/colors/constants";
import { useNavigate } from "react-router";

const AddCarFormular = () => {
  const [createCar, { loading, error }] = useMutation(CREATE_CAR, {});
  const navigate = useNavigate();

  // if (loading) return <Loading size="lg" className="py-8" />;
  //if (error) return <ErrorMessage error={error} title="Failed to add car" />;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    createCar({
      variables: {
        input: {
          ...data,
          inputPrice: Number(data.inputPrice),
          inputDoor: Number(data.inputDoor),
          inputNumberOfGears: Number(data.inputNumberOfGears),
          inputRegistrationDate: data.inputRegistrationDate,
        },
      },
    });

    navigate("/cars");
  };

  return (
    <>
      <h1 className="text-2xl font-bold">AddCar</h1>

      {/* form for add car */}
      <form
        className="grid grid-cols-2 gap-4 mt-4 w-2/3"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="col-span-2 bg-danger text-sm p-2 text-white whitespace-pre-line">
            {error?.message.split(", ").join("\n")}
          </div>
        )}
        <Select placeholder="Select Brand" name="inputBrandId">
          {BRANDS.map((brand) => (
            <option key={brand.brandId} value={brand.brandId}>
              {brand.brandName}
            </option>
          ))}
        </Select>
        <Input type="text" placeholder="Car Name" name="inputCarName" />
        <div className="col-span-2">
          <Input type="text" placeholder="Car Image" name="inputImageUrl" />
        </div>

        <Input type="text" placeholder="Car Price" name="inputPrice" />
        <Input type="text" placeholder="Car Fuel" name="inputFuel" />
        <Input type="text" placeholder="Car Door" name="inputDoor" />
        <Input
          type="text"
          placeholder="Car Number of Gears"
          name="inputNumberOfGears"
        />
        <Input
          type="text"
          placeholder="Car Registration Date"
          name="inputRegistrationDate"
        />

        <Select placeholder="Select Color" name="inputColorId">
          {COLORS.map((color) => (
            <option key={color.colorId} value={color.colorId}>
              {color.colorName}
            </option>
          ))}
        </Select>

        <div className="col-span-2 flex justify-end">
          <Button type="submit">{loading ? "Adding..." : "Add Car"}</Button>
        </div>
      </form>
    </>
  );
};

export default AddCarFormular;
