import { notFoundError, handlePrismaError } from "../../errors";
import prisma from "../../prisma";

export const queryResolvers = {
  getAllCars: async (
    _: unknown,
    {
      limit = 10,
      offset = 0,
      sort,
      filter,
    }: {
      limit?: number;
      offset?: number;
      sort?: { field: string; order: string };
      filter?: { search?: string };
    }
  ) => {
    try {
      // Build orderBy object based on sort input
      let orderBy: Record<string, "asc" | "desc"> = { carId: "asc" }; // default sorting

      if (sort) {
        const { field, order } = sort;
        const sortOrder = order.toLowerCase() === "desc" ? "desc" : "asc";

        switch (field) {
          case "carName":
            orderBy = { carName: sortOrder };
            break;
          case "price":
            orderBy = { price: sortOrder };
            break;
          case "door":
            orderBy = { door: sortOrder };
            break;
          case "fuel":
            orderBy = { fuel: sortOrder };
            break;
          case "numberOfGears":
            orderBy = { numberOfGears: sortOrder };
            break;
          case "registrationDate":
            orderBy = { registrationDate: sortOrder };
            break;
          default:
            orderBy = { carId: "asc" };
        }
      }

      // Build where clause for filtering
      const whereClause: Record<string, unknown> = {};

      if (filter?.search) {
        whereClause.OR = [
          {
            carName: {
              contains: filter.search,
            },
          },
          {
            brand: {
              brandName: {
                contains: filter.search,
              },
            },
          },
        ];
      }

      const [cars, total] = await Promise.all([
        prisma.car.findMany({
          where: whereClause,
          include: { color: true, brand: true },
          take: limit,
          skip: offset,
          orderBy,
        }),
        prisma.car.count({
          where: whereClause,
        }),
      ]);

      return {
        items: cars,
        total,
        hasMore: offset + limit < total,
        nextOffset: offset + limit < total ? offset + limit : null,
      };
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
