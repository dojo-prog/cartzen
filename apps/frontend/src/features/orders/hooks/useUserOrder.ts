import { useQuery } from "@tanstack/react-query";
import { getUserOrder } from "../api/order.api";

export const useUserOrder = (orderId?: string) => {
  return useQuery({
    queryKey: ["user-orders", orderId],
    queryFn: () => getUserOrder(orderId!),
    enabled: !!orderId,
  });
};
