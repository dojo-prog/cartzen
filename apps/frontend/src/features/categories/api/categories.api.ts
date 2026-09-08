import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type { Category, CategoryQuery } from "@cartzen/shared";

export const getCategories = async (
  params: CategoryQuery,
): Promise<PaginatedResult<"categories", Category>> => {
  const { data } = await api.get("/v1/categories", { params });

  return data.data;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/v1/categories/all");

  return data.data.categories;
};

export const getCategory = async (categorySlug: string): Promise<Category> => {
  const { data } = await api.get(`/v1/categories/${categorySlug}`);

  return data.data.category;
};
