import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type { Category, Subcategory, SubcategoryQuery } from "@cartzen/shared";

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

export const getAllSubcategories = async (): Promise<
  Partial<Subcategory>[]
> => {
  const { data } = await api.get("/v1/categories/subcategories/all");

  return data.data.subcategories;
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
