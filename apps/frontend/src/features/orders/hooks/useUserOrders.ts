import type { OrderQuery } from "@cartzen/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUserOrders } from "../api/order.api";

export const useUserOrders = (params: OrderQuery) => {
  return useInfiniteQuery({
    queryKey: ["user-orders", params],

    queryFn: ({ pageParam }) => {
      return getUserOrders({ ...params, page: pageParam });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
