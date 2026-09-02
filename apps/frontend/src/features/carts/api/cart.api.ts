import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type {
  AddToCartBody,
  CartItemQuery,
  CartItemWithRelations,
  UpdateCartItemBody,
} from "@cartzen/shared";

export const getCartItems = async (
  params: CartItemQuery,
): Promise<PaginatedResult<"cart_items", CartItemWithRelations>> => {
  const { data } = await api.get("/v1/cart/items", { params });

  return data.data;
};

export const addToCart = async (
  body: AddToCartBody,
): Promise<CartItemWithRelations> => {
  const { data } = await api.post("/v1/cart/items", body);

  return data.data.cart_item;
};

export const getCartItem = async (
  productId: string,
): Promise<CartItemWithRelations> => {
  const { data } = await api.get(`/v1/cart/items/${productId}`);

  return data.data.cart_item;
};

export const updateItemQuantity = async (
  productId: string,
  body: UpdateCartItemBody,
): Promise<CartItemWithRelations> => {
  const { data } = await api.patch(`/v1/cart/items/${productId}`, body);

  return data.data.cart_item;
};

export const removeItemFromCart = async (
  productId: string,
): Promise<string> => {
  await api.delete(`/v1/cart/items/${productId}`);

  return productId;
};
