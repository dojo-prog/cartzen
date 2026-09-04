import { useQuery } from "@tanstack/react-query";
import { getAllCartItems } from "../api/cart.api";

export const useAllCartItems = () => {
  return useQuery({
    queryKey: ["all-cart-items"],
    queryFn: getAllCartItems,
  });
};
