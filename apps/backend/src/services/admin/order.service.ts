import { OrderItem, OrderQuery } from "@cartzen/shared";
import { GetOrdersResult } from "../../types/entities/order.types";

import * as orderRepository from "../../repositories/order.repository";
import * as orderItemRepository from "../../repositories/order_item.repository";

export const getOrders = async (
  filters: OrderQuery,
): Promise<GetOrdersResult> => {
  const { orders, total } = await orderRepository.findAdmin(filters);

  const orderIds = orders.map((o) => o.id);

  const allOrdersItems = await orderItemRepository.findByOrderIds(orderIds);

  const itemsByOrderId = new Map<string, OrderItem[]>();

  for (const item of allOrdersItems) {
    const orderItems = itemsByOrderId.get(item.order_id) ?? [];

    orderItems.push(item);

    itemsByOrderId.set(item.order_id, orderItems);
  }

  const ordersWithItems = orders.map(({ user_id, ...o }) => ({
    ...o,
    items: itemsByOrderId.get(o.id) ?? [],
  }));

  const { page, limit } = filters;

  return {
    orders: ordersWithItems,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
};
