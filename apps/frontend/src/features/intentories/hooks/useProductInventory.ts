import { useQuery } from "@tanstack/react-query";
import { getProductInventory } from "../api/inventory.api";

export const useProductInventory = (productId?: string) => {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: () => getProductInventory(productId!),
    enabled: !!productId,
  });
};
