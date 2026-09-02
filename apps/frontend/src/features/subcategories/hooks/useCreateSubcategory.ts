import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateSubcategoryBody } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as subcategoryApi from "../api/subcategory.api";

type CreateSubcategoryVariables = {
  categoryId: string;
  body: CreateSubcategoryBody;
};

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, body }: CreateSubcategoryVariables) =>
      subcategoryApi.createSubcategory(categoryId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });

      toast.success("Created new subcategory");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
