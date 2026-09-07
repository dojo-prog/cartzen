import type { ProductQuery } from "@cartzen/shared";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminOrders } from "../api/admin-order.api";

export const useAdminOrders = (params: ProductQuery) => {
  return useQuery({
    queryKey: ["admin-orders", params],
    queryFn: () => getAdminOrders(params),
    placeholderData: keepPreviousData,
  });
};
