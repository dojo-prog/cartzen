import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateCategoryBody } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as categoryApi from "../api/admin-categories.api";

type UpdateCategoryVariables = {
  categoryId: string;
  body: UpdateCategoryBody;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, body }: UpdateCategoryVariables) =>
      categoryApi.updateCategory(categoryId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });

      toast.success("Category updated");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
