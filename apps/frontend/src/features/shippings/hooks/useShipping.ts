import { useQuery } from "@tanstack/react-query";
import { getShippingDetails } from "../api/shipping.api";

export const useShipping = () => {
  return useQuery({
    queryKey: ["shippings"],
    queryFn: getShippingDetails,
  });
};
