import type { CategoryQuery } from "@cartzen/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/admin-categories.api";

export const useAdminCategories = (params: CategoryQuery) => {
  return useQuery({
    queryKey: ["admin-categories", params],
    queryFn: () => getCategories(params),
    placeholderData: keepPreviousData,
  });
};
