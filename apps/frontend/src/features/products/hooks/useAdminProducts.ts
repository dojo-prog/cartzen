import { useInfiniteQuery } from "@tanstack/react-query";
import { getAdminProducts } from "../api/admin-product.api";
import type { ProductQuery } from "@cartzen/shared";

export const useAdminProducts = (params: ProductQuery) => {
  return useInfiniteQuery({
    queryKey: ["admin-products", params],
    queryFn: ({ pageParam }) =>
      getAdminProducts({ ...params, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
