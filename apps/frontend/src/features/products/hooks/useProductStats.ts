import { useQuery } from "@tanstack/react-query";
import { getProductStats } from "../api/admin-product.api";

export const useProductStats = () => {
  return useQuery({
    queryKey: ["product-stats"],
    queryFn: getProductStats,
  });
};
