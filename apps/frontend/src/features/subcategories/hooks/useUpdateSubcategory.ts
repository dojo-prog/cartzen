import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateSubcategoryBody } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as subcategoryApi from "../api/admin-subcategory.api";

type UpdateSubcategoryVariables = {
  subcategoryId: string;
  body: UpdateSubcategoryBody;
};

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ subcategoryId, body }: UpdateSubcategoryVariables) =>
      subcategoryApi.updateSubcategory(subcategoryId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subcategories"] });

      toast.success("Updated subcategory");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
