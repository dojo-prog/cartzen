import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../api/categories.api";

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["all-categories"],
    queryFn: getAllCategories,
  });
};
