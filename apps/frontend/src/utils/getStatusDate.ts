import type { OrderWithItems } from "@cartzen/shared";
import { formatDate } from "./formatDate";

export const getStatusDate = (order: OrderWithItems) => {
  switch (order.status) {
    case "paid":
      return order.paid_at ? `Paid on ${formatDate(order.paid_at)}` : null;

    case "processing":
      return order.processed_at
        ? `Processing started on ${formatDate(order.processed_at)}`
        : null;

    case "shipped":
      return order.shipped_at
        ? `Shipped on ${formatDate(order.shipped_at)}`
        : null;

    case "delivered":
      return order.delivered_at
        ? `Delivered on ${formatDate(order.delivered_at)}`
        : null;

    case "cancelled":
      return order.cancelled_at
        ? `Cancelled on ${formatDate(order.cancelled_at)}`
        : null;

    default:
      return null;
  }
};
