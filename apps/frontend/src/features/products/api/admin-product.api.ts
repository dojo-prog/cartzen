import { api } from "@/services/api/axios";

interface GetProductStatsResult {
  total_products: number;
  active_products: number;
  out_of_stock_products: number;
  featured_products: number;
}

export const getProductStats = async (): Promise<GetProductStatsResult> => {
  const { data } = await api.get("/v1/products/stats");
  return data.data;
};
