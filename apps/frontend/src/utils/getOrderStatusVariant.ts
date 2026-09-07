import type { OrderWithItems } from "@cartzen/shared";

export const getOrderStatusVariant = (status: OrderWithItems["status"]) => {
  switch (status) {
    case "pending":
      return "secondary";

    case "paid":
      return "default";

    case "processing":
      return "default";

    case "shipped":
      return "outline";

    case "delivered":
      return "default";

    case "cancelled":
      return "destructive";

    default:
      return "outline";
  }
};
