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

export const createCarSchema = z.object({
  inputCarName: carNameSchema,
  inputImageUrl: imageUrlSchema,
  inputColorId: requiredIdSchema,
  inputBrandId: requiredIdSchema,
});

export const updateCarSchema = z.object({
  id: requiredIdSchema,
  inputCarName: carNameSchema.optional(),
  inputImageUrl: imageUrlSchema,
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
