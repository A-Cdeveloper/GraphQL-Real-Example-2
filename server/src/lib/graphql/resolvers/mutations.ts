import {
  notFoundError,
  databaseError,
  authenticationError,
  validationError,
  handlePrismaError,
} from "../../errors";
import prisma from "../../prisma";
import { GraphQLContext } from "../types";
import {
  createCarSchema,
  updateCarSchema,
  deleteCarSchema,
  createBrandSchema,
  updateBrandSchema,
  deleteBrandSchema,
} from "../validation";

export const mutationResolvers = {
  createCar: async (
    _: unknown,
    {
      input: { inputCarName, inputColorId, inputBrandId },
    }: {
      input: {
        inputCarName: string;
        inputColorId: string;
        inputBrandId: string;
      };
    },
    context: GraphQLContext
  ) => {
    const { user } = context;

    if (!user) {
      throw authenticationError();
    }

    // Zod validation
    const result = createCarSchema.safeParse({
      inputCarName,
      inputColorId,
      inputBrandId,
    });

    if (!result.success) {
      throw validationError(
        `${result.error.issues.map((i) => i.message).join(", ")}`
      );
    }

    try {
      const car = await prisma.car.create({
        data: {
          carName: inputCarName,
          colorId: inputColorId,
          brandId: inputBrandId,
        },
        include: { color: true, brand: true },
      });

      return car;
    } catch (error) {
      handlePrismaError(error, {
        operation: "create car",
      });
    }
  },

  updateCar: async (
    _: unknown,
    {
      id,
      input,
    }: {
      id: string;
      input: {
        inputCarName: string;
        inputColorId: string;
        inputBrandId: string;
      };
    },
    context: GraphQLContext
  ) => {
    const { user } = context;

    if (!user) {
      throw authenticationError();
    }

    // Zod validation
    const result = updateCarSchema.safeParse({
      id,
      inputCarName: input.inputCarName,
      inputColorId: input.inputColorId,
      inputBrandId: input.inputBrandId,
    });

    if (!result.success) {
      throw validationError(
        `${result.error.issues.map((i) => i.message).join(", ")}`
      );
    }

    // Prepare data object with only sent values
    const updateData: Parameters<typeof prisma.car.update>[0]["data"] = {};

    if (input.inputCarName) updateData.carName = input.inputCarName;
    if (input.inputColorId) updateData.colorId = input.inputColorId;
    if (input.inputBrandId) updateData.brandId = input.inputBrandId;

    // Check if at least one field is provided for update
    if (Object.keys(updateData).length === 0) {
      throw validationError("At least one field must be provided for update");
    }

    try {
      // SAMO 1 DB poziv - ažurira direktno
      const car = await prisma.car.update({
        where: { carId: id },
        data: updateData,
        include: { color: true, brand: true },
      });

      return car;
    } catch (error) {
      handlePrismaError(error, {
        operation: "update car",
        id,
      });
    }
  },

  deleteCar: async (
    _: unknown,
    { id }: { id: string },
    context: GraphQLContext
  ) => {
    const { user } = context;

    if (!user) {
      throw authenticationError();
    }

    // Zod validation
    const result = deleteCarSchema.safeParse({ id });

    if (!result.success) {
      throw validationError(
        `Validation failed: ${result.error.issues
          .map((i) => i.message)
          .join(", ")}`
      );
    }

    try {
      // SAMO 1 DB poziv - briše direktno i vraća obrisani objekat
      const car = await prisma.car.delete({
        where: { carId: id },
        include: { color: true, brand: true },
      });

      return car;
    } catch (error) {
      handlePrismaError(error, {
        operation: "delete car",
        id,
      });
    }
  },

  createBrand: async (
    _: unknown,
    {
      input: { inputBrandName, inputBrandUrl },
    }: {
      input: {
        inputBrandName: string;
        inputBrandUrl: string;
      };
    },
    context: GraphQLContext
  ) => {
    const { user } = context;

    if (!user) {
      throw authenticationError();
    }

    // Zod validation
    const result = createBrandSchema.safeParse({
      inputBrandName,
      inputBrandUrl,
    });

    if (!result.success) {
      throw validationError(
        `${result.error.issues.map((i) => i.message).join(", ")}`
      );
    }

    try {
      const brand = await prisma.brand.create({
        data: {
          brandName: inputBrandName,
          brandUrl: inputBrandUrl,
        },
        include: { cars: true },
      });

      return brand;
    } catch (error) {
      handlePrismaError(error, {
        operation: "create brand",
      });
    }
  },

  updateBrand: async (
    _: unknown,
    {
      id,
      input,
    }: {
      id: string;
      input: {
        inputBrandName: string;
        inputBrandUrl: string;
      };
    },
    context: GraphQLContext
  ) => {
    const { user } = context;

    if (!user) {
      throw authenticationError();
    }

    // Zod validation
    const result = updateBrandSchema.safeParse({
      id,
      inputBrandName: input.inputBrandName,
      inputBrandUrl: input.inputBrandUrl,
    });

    if (!result.success) {
      throw validationError(
        `${result.error.issues.map((i) => i.message).join(", ")}`
      );
    }

    // Prepare data object with only sent values
    const updateData: Parameters<typeof prisma.brand.update>[0]["data"] = {};

    if (input.inputBrandName) updateData.brandName = input.inputBrandName;
    if (input.inputBrandUrl) updateData.brandUrl = input.inputBrandUrl;

    // Check if at least one field is provided for update
    if (Object.keys(updateData).length === 0) {
      throw validationError("At least one field must be provided for update");
    }

    try {
      const brand = await prisma.brand.update({
        where: { brandId: id },
        data: updateData,
        include: { cars: true },
      });

      return brand;
    } catch (error) {
      handlePrismaError(error, {
        operation: "update brand",
        id,
      });
    }
  },

  deleteBrand: async (
    _: unknown,
    { id }: { id: string },
    context: GraphQLContext
  ) => {
    const { user } = context;

    if (!user) {
      throw authenticationError();
    }

    // Zod validation
    const result = deleteBrandSchema.safeParse({ id });

    if (!result.success) {
      throw validationError(
        `Validation failed: ${result.error.issues
          .map((i) => i.message)
          .join(", ")}`
      );
    }

    try {
      const brand = await prisma.brand.delete({
        where: { brandId: id },
        include: { cars: true },
      });

      return brand;
    } catch (error) {
      handlePrismaError(error, {
        operation: "delete brand",
        id,
      });
    }
  },
};
