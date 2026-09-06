import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type {
  CreateProductBody,
  ProductQuery,
  ProductWithRelations,
  UpdateProductBody,
} from "@cartzen/shared";

interface GetProductStatsResult {
  total_products: number;
  active_products: number;
  out_of_stock_products: number;
  featured_products: number;
}

export const getProductStats = async (): Promise<GetProductStatsResult> => {
  const { data } = await api.get("/v1/admin/products/stats");
  return data.data;
};

export const getAdminProducts = async (
  params: ProductQuery,
): Promise<PaginatedResult<"products", ProductWithRelations>> => {
  const { data } = await api.get("/v1/admin/products", { params });

  return data.data;
};

export const createProduct = async (
  body: CreateProductBody,
): Promise<ProductWithRelations> => {
  const { data } = await api.post(`/v1/admin/products`, body);

  return data.data.product;
};

export const updateProduct = async (
  productId: string,
  body: UpdateProductBody,
): Promise<ProductWithRelations> => {
  const { data } = await api.patch(`/v1/admin/products/${productId}`, body);

  return data.data.product;
};

export const deleteProduct = async (
  productId: string,
): Promise<ProductWithRelations> => {
  const { data } = await api.delete(`/v1/admin/products/${productId}`);

  return data.data.product;
};
