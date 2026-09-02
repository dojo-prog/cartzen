import type { ProductQuery } from "@cartzen/shared";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.api";

export const useProducts = (params: ProductQuery) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam }) => getProducts({ ...params, page: pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
