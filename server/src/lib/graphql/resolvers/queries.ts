import { notFoundError, handlePrismaError } from "../../errors";
import prisma from "../../prisma";

export const queryResolvers = {
  getAllCars: async (_: unknown, { limit }: { limit?: number }) => {
    try {
      const [cars, total] = await Promise.all([
        prisma.car.findMany({
          include: { color: true, brand: true },
          ...(limit && { take: limit }),
        }),
        prisma.car.count(),
      ]);

      return { items: cars, total };
    } catch (error) {
      handlePrismaError(error, {
        operation: "fetch cars",
      });
    }
  },

  getCarById: async (_: unknown, { id }: { id: string }) => {
    try {
      const car = await prisma.car.findUnique({
        where: { carId: id },
        include: { color: true, brand: true },
      });

      if (!car) {
        throw notFoundError(`Car with id ${id} not found`);
      }

      return car;
    } catch (error) {
      handlePrismaError(error, {
        operation: "fetch car",
        id,
      });
    }
  },

  getAllBrands: async () => {
    try {
      const brands = await prisma.brand.findMany({
        include: { cars: true },
      });

      return { items: brands, total: brands.length };
    } catch (error) {
      handlePrismaError(error, {
        operation: "fetch brands",
      });
    }
  },

  getBrandById: async (_: unknown, { id }: { id: string }) => {
    try {
      const brand = await prisma.brand.findUnique({
        where: { brandId: id },
        include: { cars: true },
      });

      if (!brand) {
        throw notFoundError(`Brand with id ${id} not found`);
      }

      return brand;
    } catch (error) {
      handlePrismaError(error, {
        operation: "fetch brand",
        id,
      });
    }
  },
};
