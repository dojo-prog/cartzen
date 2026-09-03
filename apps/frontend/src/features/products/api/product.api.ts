import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type {
  CreateProductBody,
  ProductQuery,
  ProductWithRelations,
  UpdateProductBody,
} from "@cartzen/shared";

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

export const createProduct = async (
  body: CreateProductBody,
): Promise<ProductWithRelations> => {
  const { data } = await api.post(`/v1/products/`, body);

  return data.data.product;
};

export const updateProduct = async (
  productId: string,
  body: UpdateProductBody,
): Promise<ProductWithRelations> => {
  const { data } = await api.patch(`/v1/products/${productId}`, body);

  return data.data.product;
};

export const deleteProduct = async (
  productId: string,
): Promise<ProductWithRelations> => {
  const { data } = await api.delete(`/v1/products/${productId}`);

  return data.data.product;
};
