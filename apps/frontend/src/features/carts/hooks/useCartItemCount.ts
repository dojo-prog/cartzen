import { useQuery } from "@tanstack/react-query";
import { getCartItemCount } from "../api/cart.api";

export const useCartItemCount = (userId?: string) => {
  return useQuery({
    queryKey: ["cart-items-count"],
    queryFn: getCartItemCount,
    enabled: !!userId,
  });
};
