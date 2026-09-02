import { useQuery } from "@tanstack/react-query";

import * as categoryApi from "../api/categories.api";

export const useCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ["categories", categorySlug],
    queryFn: () => categoryApi.getCategory(categorySlug),
  });
};
