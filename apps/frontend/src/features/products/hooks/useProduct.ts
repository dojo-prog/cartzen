import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/product.api";

export const useProduct = (productId?: string) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProduct(productId!),

    enabled: !!productId,
  });
};
