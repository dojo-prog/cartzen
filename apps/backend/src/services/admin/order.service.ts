import {
  OrderItem,
  OrderQuery,
  OrderStatus,
  OrderWithItems,
} from "@cartzen/shared";
import { GetOrdersResult } from "../../types/entities/order.types";

import * as orderRepository from "../../repositories/order.repository";
import * as orderItemRepository from "../../repositories/order_item.repository";
import AppError from "../../utils/AppError";
import { Pool } from "pg";
import pool from "../../database/db";

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

export const advanceOrderStatus = async (
  orderId: string,
): Promise<OrderWithItems | void> => {
  const order = await orderRepository.findAdminById(orderId);

  if (!order) {
    throw new AppError(404, "Order not found");
  }

  const statusMap: Partial<Record<OrderStatus, OrderStatus>> = {
    paid: "processing",
    processing: "shipped",
    shipped: "delivered",
  };

  const timestampColumnMap: Partial<Record<OrderStatus, string>> = {
    processing: "processed_at",
    shipped: "shipped_at",
    delivered: "delivered_at",
  };

  const nextStatus = statusMap[order.status];

  const timestamp = nextStatus && timestampColumnMap[nextStatus];

  if (!nextStatus || !timestamp) {
    throw new AppError(400, "This order's status cannot progress");
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const updated = await orderRepository.advanceStatus(
      orderId,
      nextStatus,
      timestamp,
      client,
    );

    const orderItems = await orderItemRepository.findByOrderId(orderId, client);

    await client.query("COMMIT");

    return {
      ...updated,
      items: orderItems,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
