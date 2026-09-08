import type { SubcategoryQuery } from "@cartzen/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getSubcategories } from "../api/admin-subcatgory.api";

export const useAdminSubcategories = (params: SubcategoryQuery) => {
  return useQuery({
    queryKey: ["admin-subcategories", params],
    queryFn: () => getSubcategories(params),
    placeholderData: keepPreviousData,
  });
};
