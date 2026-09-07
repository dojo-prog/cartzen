import { useQuery } from "@tanstack/react-query";
import { getAllSubcategories } from "../api/subcategory.api";

export const useAllSubcategories = () => {
  return useQuery({
    queryKey: ["all-subcategories"],
    queryFn: getAllSubcategories,
  });
};
