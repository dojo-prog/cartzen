import { api } from "@/services/api/axios";
import type { PaginatedResult } from "@/types/common";
import type { OrderQuery, OrderWithItems } from "@cartzen/shared";

export const getAdminOrders = async (
  params: OrderQuery,
): Promise<PaginatedResult<"orders", OrderWithItems>> => {
  const { data } = await api.get("/v1/admin/orders", { params });

  return data.data;
};

export const advanceOrderStatus = async (
  orderId: string,
): Promise<OrderWithItems> => {
  const { data } = await api.post(`/v1/admin/orders/${orderId}/status`);

  return data.data.order;
};
