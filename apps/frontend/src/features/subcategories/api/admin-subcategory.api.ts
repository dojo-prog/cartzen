import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type {
  CreateSubcategoryBody,
  Subcategory,
  SubcategoryQuery,
  SubcategoryWithRelations,
  UpdateSubcategoryBody,
} from "@cartzen/shared";

export const getSubcategories = async (
  params: SubcategoryQuery,
): Promise<PaginatedResult<"subcategories", SubcategoryWithRelations>> => {
  const { data } = await api.get(`/v1/admin/subcategories`, { params });

  return data.data;
};

export const createSubcategory = async (
  body: CreateSubcategoryBody,
): Promise<SubcategoryWithRelations> => {
  const { data } = await api.post(`/v1/admin/subcategories`, body);

  return data.data.subcategory;
};

export const updateSubcategory = async (
  subcategoryId: string,
  body: UpdateSubcategoryBody,
): Promise<SubcategoryWithRelations> => {
  const { data } = await api.patch(
    `/v1/admin/subcategories/${subcategoryId}`,
    body,
  );

  return data.data.subcategory;
};

export const deleteSubcategory = async (
  subcategoryId: string,
): Promise<Subcategory> => {
  const { data } = await api.delete(`/v1/admin/subcategories/${subcategoryId}`);

  return data.data.subcategory;
};
