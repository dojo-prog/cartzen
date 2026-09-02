import { useQuery } from "@tanstack/react-query";

import * as cartItemApi from "../api/cart.api";

export const useCartItem = (productId: string) => {
  return useQuery({
    queryKey: ["cart-items", productId],
    queryFn: () => cartItemApi.getCartItem(productId),
  });
};
