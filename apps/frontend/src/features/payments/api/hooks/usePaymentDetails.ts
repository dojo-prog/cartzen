import { useQuery } from "@tanstack/react-query";
import { getPaymentDetails } from "../payment.api";

export const usePaymentDetails = (paymentId?: string) => {
  return useQuery({
    queryKey: ["payments", paymentId],
    queryFn: () => getPaymentDetails(paymentId!),
    enabled: !!paymentId,
  });
};
