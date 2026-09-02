import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type { Category, UpdateCategoryBody } from "@cartzen/shared";
import type { PaginatedResult } from "@/types/common";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as categoryApi from "../api/categories.api";

type UpdateCategoryVariables = {
  categoryId: string;
  body: UpdateCategoryBody;
};

type CategoriesPage = PaginatedResult<"categories", Category>;

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, body }: UpdateCategoryVariables) =>
      categoryApi.updateCategory(categoryId, body),

    onSuccess: (updated) => {
      queryClient.setQueriesData<InfiniteData<CategoriesPage>>(
        {
          queryKey: ["categories"],
        },

        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              categories: page.categories.map((c) =>
                c.id === updated.id ? updated : c,
              ),
            })),
          };
        },
      );

      toast.success("Category updated");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
