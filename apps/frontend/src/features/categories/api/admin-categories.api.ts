import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type {
  Category,
  CategoryQuery,
  CreateCategoryBody,
  UpdateCategoryBody,
} from "@cartzen/shared";

export const getCategories = async (
  params: CategoryQuery,
): Promise<PaginatedResult<"categories", Category>> => {
  const { data } = await api.get("/v1/admin/categories", { params });

  return data.data;
};

export const createCategory = async (
  body: CreateCategoryBody,
): Promise<Category> => {
  const { data } = await api.post(`/v1/categories/admin`, body);

  return data.data.category;
};

export const updateCategory = async (
  categoryId: string,
  body: UpdateCategoryBody,
): Promise<Category> => {
  const { data } = await api.patch(`/v1/categories/admin/${categoryId}`, body);

  return data.data.category;
};

export const deleteCategory = async (categoryId: string): Promise<Category> => {
  const { data } = await api.delete(`/v1/categories/admin/${categoryId}`);

  return data.data.category;
};
