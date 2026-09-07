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
  body: CreateProductBody & { thumbnail?: File },
): Promise<ProductWithRelations> => {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("description", body.description);
  formData.append("subcategoryId", body.subcategoryId);
  formData.append("rawPrice", String(body.rawPrice));
  formData.append("currency", body.currency);
  formData.append("weightGrams", String(body.weightGrams));
  formData.append("isActive", String(body.isActive));
  formData.append("initialQuantity", String(body.initialQuantity));

  if (body.thumbnail) {
    formData.append("thumbnail", body.thumbnail);
  }

  const { data } = await api.post(`/v1/admin/products`, formData);

  return data.data.product;
};

export const updateProduct = async (
  productId: string,
  body: UpdateProductBody & { thumbnail?: File },
): Promise<ProductWithRelations> => {
  const formData = new FormData();

  formData.append("name", body.name);
  formData.append("description", body.description);
  formData.append("subcategoryId", body.subcategoryId);
  formData.append("rawPrice", String(body.rawPrice));
  formData.append("currency", body.currency);
  formData.append("weightGrams", String(body.weightGrams));
  formData.append("isActive", String(body.isActive));

  if (body.thumbnail) {
    formData.append("thumbnail", body.thumbnail);
  }

  const { data } = await api.patch(`/v1/admin/products/${productId}`, formData);

  return data.data.product;
};

export const deleteProduct = async (
  productId: string,
): Promise<ProductWithRelations> => {
  const { data } = await api.delete(`/v1/admin/products/${productId}`);

  return data.data.product;
};

export const toggleFeatured = async (
  productId: string,
): Promise<ProductWithRelations> => {
  const { data } = await api.patch(`/v1/admin/products/${productId}/featured`);

  return data.data.product;
};
