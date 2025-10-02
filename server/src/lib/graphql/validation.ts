import { z } from "zod";

// Reusable validation schemas
const carNameSchema = z
  .string()
  .min(1, "Car name is required")
  .max(100, "Car name too long");

const imageUrlSchema = z
  .string()
  .url("Invalid image URL format")
  .optional()
  .or(z.literal(""));

const requiredIdSchema = z.string().min(1, "ID is required");

const brandNameSchema = z
  .string()
  .min(1, "Brand name is required")
  .max(100, "Brand name too long");

const brandUrlSchema = z
  .string()
  .url("Invalid URL format")
  .min(1, "Brand URL is required");

const priceSchema = z.number().positive("Price must be positive").optional();

const fuelSchema = z.string().min(1, "Fuel type is required").optional();

const doorSchema = z
  .number()
  .int("Door count must be an integer")
  .min(2, "Minimum 2 doors")
  .max(5, "Maximum 5 doors")
  .optional();

const registrationDateSchema = z
  .string()
  .regex(
    /^\d{2}\.\d{2}\.\d{4}$/,
    "Registration date must be in DD.MM.YYYY format"
  )
  .optional();

const numberOfGearsSchema = z
  .number()
  .int("Number of gears must be an integer")
  .min(3, "Minimum 3 gears")
  .max(8, "Maximum 8 gears")
  .optional();

export const createCarSchema = z.object({
  inputCarName: carNameSchema,
  inputImageUrl: imageUrlSchema,
  inputPrice: priceSchema,
  inputFuel: fuelSchema,
  inputDoor: doorSchema,
  inputRegistrationDate: registrationDateSchema,
  inputNumberOfGears: numberOfGearsSchema,
  inputColorId: requiredIdSchema,
  inputBrandId: requiredIdSchema,
});

export const updateCarSchema = z.object({
  id: requiredIdSchema,
  inputCarName: carNameSchema.optional(),
  inputImageUrl: imageUrlSchema,
  inputPrice: priceSchema,
  inputFuel: fuelSchema,
  inputDoor: doorSchema,
  inputRegistrationDate: registrationDateSchema,
  inputNumberOfGears: numberOfGearsSchema,
  inputColorId: requiredIdSchema.optional(),
  inputBrandId: requiredIdSchema.optional(),
});

export const deleteCarSchema = z.object({
  id: requiredIdSchema,
});

// Brand validation schemas
export const createBrandSchema = z.object({
  inputBrandName: brandNameSchema,
  inputBrandUrl: brandUrlSchema,
});

export const updateBrandSchema = z.object({
  id: requiredIdSchema,
  inputBrandName: brandNameSchema.optional(),
  inputBrandUrl: brandUrlSchema.optional(),
});

export const deleteBrandSchema = z.object({
  id: requiredIdSchema,
});
