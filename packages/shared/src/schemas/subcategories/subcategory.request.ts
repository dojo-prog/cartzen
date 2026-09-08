import { z } from "zod";
import {
  PaginationQuerySchema,
  SearchQuerySchema,
  SlugSchema,
  UUIDSchema,
} from "../common";
import { SubcategoryNameSchema } from "./subcategory.schema";

// =======================================
// PARAMS
// =======================================

export const SubcategoryIdParamsSchema = z.object({
  subcategoryId: UUIDSchema,
});

export const SubcategorySlugParamsSchema = z.object({
  subcategorySlug: SlugSchema,
});

// =======================================
// QUERY
// =======================================

export const SubcategoryQuerySchema = z.object({
  ...PaginationQuerySchema.shape,
  search: SearchQuerySchema,
});

// =======================================
// BODY
// =======================================

export const SubcategoryBaseBodySchema = z.object({
  name: SubcategoryNameSchema,
  categoryId: z
    .string()
    .min(1, { message: "Category is required" })
    .uuid({ message: "Invalid UUID format" }),
});

export const CreateSubcategoryBodySchema = SubcategoryBaseBodySchema;

export const UpdateSubcategoryBodySchema = SubcategoryBaseBodySchema;

// =======================================
// TYPES
// =======================================

export type SubcategoryQuery = z.infer<typeof SubcategoryQuerySchema>;

export type CreateSubcategoryBody = z.infer<typeof CreateSubcategoryBodySchema>;

export type UpdateSubcategoryBody = z.infer<typeof UpdateSubcategoryBodySchema>;
