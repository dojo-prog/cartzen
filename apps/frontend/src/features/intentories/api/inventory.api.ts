import { api } from "@/services/api/axios";
import type {
  AddStockToInventoryBody,
  Inventory,
  ProductWithRelations,
  UpdateInventoryBody,
} from "@cartzen/shared";

export const getProductInventory = async (
  productId: string,
): Promise<Inventory> => {
  const { data } = await api.get(`/v1/products/${productId}/inventory`);

  return data.data.inventory;
};

export const addInventoryStock = async (
  productId: string,
  body: AddStockToInventoryBody,
): Promise<ProductWithRelations> => {
  const { data } = await api.put(`/v1/products/${productId}/inventory`, body);

  return data.data.product;
};

export const updateProductInventory = async (
  productId: string,
  body: UpdateInventoryBody,
): Promise<ProductWithRelations> => {
  const { data } = await api.patch(`/v1/products/${productId}/inventory`, body);

  return data.data.product;
};
