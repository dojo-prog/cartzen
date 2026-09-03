import { useQuery } from "@tanstack/react-query";
import { getFeatured } from "../api/product.api";

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: getFeatured,
  });
};
