import { useInfiniteQuery } from "@tanstack/react-query";
import type { CategoryQuery } from "@cartzen/shared";

import * as categoryApi from "../api/categories.api";

export const useCategories = (params: CategoryQuery) => {
  return useInfiniteQuery({
    queryKey: ["categories", params],
    queryFn: ({ pageParam }) => {
      return categoryApi.getCategories({ ...params, page: pageParam });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
