import type { OrderWithItems } from "@cartzen/shared";
import { CheckCircle2, Clock3, Package, Truck, XCircle } from "lucide-react";

export const getStatusConfig = (status: OrderWithItems["status"]) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending Payment",
        className: "border-amber-200 bg-amber-50 text-amber-700",
        icon: Clock3,
      };

    case "paid":
      return {
        label: "Paid",
        className: "border-blue-200 bg-blue-50 text-blue-700",
        icon: CheckCircle2,
      };

    case "processing":
      return {
        label: "Processing",
        className: "border-blue-200 bg-blue-50 text-blue-700",
        icon: Package,
      };

    case "shipped":
      return {
        label: "Shipped",
        className: "border-purple-200 bg-purple-50 text-purple-700",
        icon: Truck,
      };

    case "delivered":
      return {
        label: "Delivered",
        className: "border-green-200 bg-green-50 text-green-700",
        icon: CheckCircle2,
      };

    case "cancelled":
      return {
        label: "Cancelled",
        className: "border-red-200 bg-red-50 text-red-700",
        icon: XCircle,
      };

    default:
      return {
        label: status,
        className: "border-border bg-muted text-muted-foreground",
        icon: Clock3,
      };
  }
};
