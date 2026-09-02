import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type { Subcategory, UpdateSubcategoryBody } from "@cartzen/shared";
import type { PaginatedResult } from "@/types/common";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as subcategoryApi from "../api/subcategory.api";

type UpdateSubcategoryVariables = {
  categoryId: string;
  subcategoryId: string;
  body: UpdateSubcategoryBody;
};

type SubcategoriesPage = PaginatedResult<"subcategories", Subcategory>;

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      categoryId,
      subcategoryId,
      body,
    }: UpdateSubcategoryVariables) =>
      subcategoryApi.updateSubcategory(categoryId, subcategoryId, body),

    onSuccess: (updated) => {
      queryClient.setQueriesData<InfiniteData<SubcategoriesPage>>(
        {
          queryKey: ["subcategories"],
        },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              subcategories: page.subcategories.map((sc) =>
                sc.id === updated.id ? updated : sc,
              ),
            })),
          };
        },
      );

      toast.success("Updated subcategory");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
