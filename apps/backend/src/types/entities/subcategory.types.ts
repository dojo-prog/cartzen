import { Subcategory, SubcategoryQuery } from "@cartzen/shared";
import { GetResult, UpdateResult } from "./common";

// =======================================
// SERVICE PARAMS
// =======================================

export interface GetSubcategoriesParams {
  filters: SubcategoryQuery;
}

export interface GetSubcategoryBySlugParams {
  categorySlug: string;
  subcategorySlug: string;
}

export interface BaseSubcategoryPayload {
  categoryId: string;
  name: string;
}

export interface CreateSubcategoryParams {
  payload: BaseSubcategoryPayload;
}

export interface UpdateSubcategoryParams {
  subcategoryId: string;
  payload: BaseSubcategoryPayload;
}

export interface DeleteSubcategoryParams {
  subcategoryId: string;
}

// =======================================
// REPOSITORY DATA
// =======================================

export interface CreateSubcategoryData {
  category_id: string;
  name: string;
  slug: string;
}

// =======================================
// RESULT
// =======================================

export type GetSubcategoriesResult = GetResult<"subcategories", Subcategory>;

export type UpdateSubcategoryResult = UpdateResult<"subcategory", Subcategory>;
