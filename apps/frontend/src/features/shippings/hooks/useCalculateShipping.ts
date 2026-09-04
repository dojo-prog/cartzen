import { useQuery } from "@tanstack/react-query";
import { calculateShipping } from "../api/shipping.api";

export const useCalculateShipping = (addressId?: string) => {
  return useQuery({
    queryKey: ["calculated-address", addressId],
    queryFn: () => calculateShipping(addressId!),
    enabled: !!addressId,
  });
};
