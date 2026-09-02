import { useQuery } from "@tanstack/react-query";

import * as subcategoryApi from "../api/subcategory.api";

export const useSubcategory = (
  categorySlug?: string,
  subCategorySlug?: string,
) => {
  return useQuery({
    queryKey: ["categories", categorySlug, subCategorySlug],
    queryFn: () =>
      subcategoryApi.getSubcategory(categorySlug!, subCategorySlug!),

    enabled: !!categorySlug && !!subCategorySlug,
  });
};
