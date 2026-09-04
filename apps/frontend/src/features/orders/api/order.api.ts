import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type { CheckoutBody, OrderQuery, OrderWithItems } from "@cartzen/shared";

export const getUserOrders = async (
  params: OrderQuery,
): Promise<PaginatedResult<"orders", OrderWithItems>> => {
  const { data } = await api.get("/v1/orders", { params });

  return data.data;
};

export const getUserOrder = async (
  orderId: string,
): Promise<OrderWithItems> => {
  const { data } = await api.get(`/v1/orders/${orderId}`);

  return data.data.order;
};

export const checkout = async (body: CheckoutBody) => {
  const { data } = await api.post(`/v1/orders/checkout`, body);

  return data.data.order;
};
