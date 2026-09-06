import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminProducts } from "../api/admin-product.api";
import type { ProductQuery, ProductWithRelations } from "@cartzen/shared";
import type { PaginatedResult } from "@/types/common";

export const useAdminProducts = (params: ProductQuery) => {
  return useQuery<PaginatedResult<"products", ProductWithRelations>>({
    queryKey: ["admin-products", params],
    queryFn: () => getAdminProducts(params),
    placeholderData: keepPreviousData,
  });
};
