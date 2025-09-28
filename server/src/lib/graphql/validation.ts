import { z } from "zod";

export const createCarSchema = z.object({
  inputCarName: z
    .string()
    .min(1, "Car name is required")
    .max(100, "Car name too long"),
  inputColorId: z.string().min(1, "Color is required"),
  inputBrandId: z.string().min(1, "Brand is required"),
});

export const updateCarSchema = z.object({
  id: z.string().min(1, "Car ID is required"),
  inputCarName: z
    .string()
    .min(1, "Car name cannot be empty")
    .max(100, "Car name too long")
    .optional(),
  inputColorId: z.string().min(1, "Color cannot be empty").optional(),
  inputBrandId: z.string().min(1, "Brand cannot be empty").optional(),
});

export const deleteCarSchema = z.object({
  id: z.string().min(1, "Car ID is required"),
});

// Brand validation schemas
export const createBrandSchema = z.object({
  inputBrandName: z
    .string()
    .min(1, "Brand name is required")
    .max(100, "Brand name too long"),
  inputBrandUrl: z
    .string()
    .url("Invalid URL format")
    .min(1, "Brand URL is required"),
});

export const updateBrandSchema = z.object({
  id: z.string().min(1, "Brand ID is required"),
  inputBrandName: z
    .string()
    .min(1, "Brand name cannot be empty")
    .max(100, "Brand name too long")
    .optional(),
  inputBrandUrl: z
    .string()
    .url("Invalid URL format")
    .min(1, "Brand URL cannot be empty")
    .optional(),
});

export const deleteBrandSchema = z.object({
  id: z.string().min(1, "Brand ID is required"),
});
