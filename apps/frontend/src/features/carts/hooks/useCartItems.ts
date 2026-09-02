import { useInfiniteQuery } from "@tanstack/react-query";
import type { CartItemQuery } from "@cartzen/shared";

import * as cartItemApi from "../api/cart.api";

export const useCartItems = (params: CartItemQuery) => {
  return useInfiniteQuery({
    queryKey: ["cart-items", params],
    queryFn: ({ pageParam }) => {
      return cartItemApi.getCartItems({ ...params, page: pageParam });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
