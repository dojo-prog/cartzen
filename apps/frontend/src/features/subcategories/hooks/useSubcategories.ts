import type { SubcategoryQuery } from "@cartzen/shared";
import { useInfiniteQuery } from "@tanstack/react-query";

import * as subcategoryApi from "../api/subcategory.api";

export const useSubcategories = (
  categorySlug: string,
  params: SubcategoryQuery,
) => {
  return useInfiniteQuery({
    queryKey: ["subcategories", categorySlug, params],
    queryFn: ({ pageParam }) => {
      return subcategoryApi.getSubcategories(categorySlug, {
        ...params,
        page: pageParam,
      });
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage?.pagination;

      if (page >= total_pages) return undefined;

      return page + 1;
    },
  });
};
