import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type { ProductQuery, ProductWithRelations } from "@cartzen/shared";

export const getProducts = async (
  params: ProductQuery,
): Promise<PaginatedResult<"products", ProductWithRelations>> => {
  const { data } = await api.get("/v1/products", { params });

  return data.data;
};

export const getFeatured = async (): Promise<ProductWithRelations[]> => {
  const { data } = await api.get("/v1/products", {
    params: { page: 1, limit: 10, featured: true },
  });

  return data.data.products;
};

export const getProduct = async (
  productId: string,
): Promise<ProductWithRelations> => {
  const { data } = await api.get(`/v1/products/${productId}`);

  return data.data.product;
};
