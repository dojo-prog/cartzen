import { z } from "zod";
import {
  NonNegativeIntSchema,
  PaginationQuerySchema,
  SearchQuerySchema,
  SlugSchema,
  UUIDSchema,
} from "../common";
import {
  CurrencySchema,
  IsActiveSchema,
  PriceCentsSchema,
  ProductAllowableSort,
  ProductDescriptionSchema,
  ProductNameSchema,
  WeightGramsSchema,
} from "./product.schema";

// =======================================
// PARAMS
// =======================================

export const ProductIdParamsSchema = z.object({
  productId: UUIDSchema,
});

// =======================================
// QUERY
// =======================================

export const ProductSpecificQuerySchema = z.object({
  category: SlugSchema.optional(),
  minPrice: NonNegativeIntSchema.optional(),
  maxPrice: NonNegativeIntSchema.optional(),
  inStock: z.coerce.boolean().optional(),
  featured: z.coerce.boolean().optional(),
});

export const ProductQuerySchema = z
  .object({
    ...PaginationQuerySchema.shape,
    search: SearchQuerySchema,
    sort: ProductAllowableSort.optional(),
  })
  .merge(ProductSpecificQuerySchema);

// =======================================
// BODY
// =======================================

const ProductBaseBodySchema = z.object({
  subcategoryId: z
    .string()
    .min(1, { message: "Subcategory is required" })
    .uuid({ message: "Invalid UUID format" }),
  name: ProductNameSchema,
  description: ProductDescriptionSchema,
  rawPrice: z.coerce
    .number({ message: "Price must be a number" })
    .nonnegative({ message: "Price cannot be less than 0" }),
  currency: CurrencySchema.optional().default("PHP"),
  weightGrams: WeightGramsSchema,
  isActive: IsActiveSchema.optional(),
  initialQuantity: NonNegativeIntSchema.optional(),
});

export const CreateProductBodySchema = ProductBaseBodySchema;

export const UpdateProductBodySchema = ProductBaseBodySchema;

// =======================================
// TYPES
// =======================================

export type ProductSpecificQuery = z.infer<typeof ProductSpecificQuerySchema>;

export type ProductQuery = z.infer<typeof ProductQuerySchema>;

export type CreateProductBody = z.infer<typeof CreateProductBodySchema>;

export type UpdateProductBody = z.infer<typeof UpdateProductBodySchema>;
