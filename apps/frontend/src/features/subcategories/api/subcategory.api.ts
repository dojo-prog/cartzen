import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type {
  Category,
  CreateSubcategoryBody,
  Subcategory,
  SubcategoryQuery,
  UpdateSubcategoryBody,
} from "@cartzen/shared";

export const getSubcategories = async (
  categorySlug: string,
  params: SubcategoryQuery,
): Promise<PaginatedResult<"subcategories", Subcategory>> => {
  const { data } = await api.get(
    `/v1/categories/${categorySlug}/subcategories`,
    { params },
  );

  return data.data;
};

export const getSubcategory = async (
  categorySlug: string,
  subcatgorySlug: string,
): Promise<Category> => {
  const { data } = await api.get(
    `/v1/categories/${categorySlug}/subcategories/${subcatgorySlug}`,
  );

  return data.data.subcategory;
};

export const createSubcategory = async (
  categoryId: string,
  body: CreateSubcategoryBody,
): Promise<Subcategory> => {
  const { data } = await api.post(
    `/v1/categories/${categoryId}/subcategories`,
    body,
  );

  return data.data.subcategory;
};

export const updateSubcategory = async (
  categoryId: string,
  subcategoryId: string,
  body: UpdateSubcategoryBody,
): Promise<Subcategory> => {
  const { data } = await api.patch(
    `/v1/categories/${categoryId}/subcategories/${subcategoryId}`,
    body,
  );

  return data.data.subcategory;
};

export const deleteSubcategory = async (
  categoryId: string,
  subcategoryId: string,
): Promise<Subcategory> => {
  const { data } = await api.delete(
    `/v1/categories/${categoryId}/subcategories/${subcategoryId}`,
  );

  return data.data.subcategory;
};
