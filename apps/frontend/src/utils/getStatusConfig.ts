import type { OrderWithItems } from "@cartzen/shared";
import {
  CheckCircle2,
  Clock3,
  Package,
  Truck,
  XCircle,
  type LucideIcon,
} from "lucide-react";

export interface GetStatusConfigResult {
  label: string;
  description: string;
  className: string;
  icon: LucideIcon;
}

export const getStatusConfig = (
  status: OrderWithItems["status"],
): GetStatusConfigResult => {
  switch (status) {
    case "pending":
      return {
        label: "Pending Payment",
        description: "Waiting for payment to be completed.",
        className: "border-amber-200 bg-amber-50 text-amber-700",
        icon: Clock3,
      };

    case "paid":
      return {
        label: "Paid",
        description: "Payment received. Your order is confirmed.",
        className: "border-blue-200 bg-blue-50 text-blue-700",
        icon: CheckCircle2,
      };

    case "processing":
      return {
        label: "Processing",
        description: "Your order is being prepared.",
        className: "border-blue-200 bg-blue-50 text-blue-700",
        icon: Package,
      };

    case "shipped":
      return {
        label: "Shipped",
        description: "Your order is on its way.",
        className: "border-purple-200 bg-purple-50 text-purple-700",
        icon: Truck,
      };

    case "delivered":
      return {
        label: "Delivered",
        description: "Your order has been delivered.",
        className: "border-green-200 bg-green-50 text-green-700",
        icon: CheckCircle2,
      };

    case "cancelled":
      return {
        label: "Cancelled",
        description: "This order has been cancelled.",
        className: "border-red-200 bg-red-50 text-red-700",
        icon: XCircle,
      };

    default:
      return {
        label: status,
        description: "Order status updated.",
        className: "border-border bg-muted text-muted-foreground",
        icon: Clock3,
      };
  }
};
