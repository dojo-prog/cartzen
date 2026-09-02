import { useQuery } from "@tanstack/react-query";
import { getPaymentByOrder } from "../api/payment.api";

export const usePaymentByOrder = (orderId?: string) => {
  return useQuery({
    queryKey: ["payments", orderId],
    queryFn: () => getPaymentByOrder(orderId!),
    enabled: !!orderId,
  });
};
