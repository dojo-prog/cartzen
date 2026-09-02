import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as subcategoryApi from "../api/subcategory.api";

type DeleteSubcategoryVariables = {
  categoryId: string;
  subcategoryId: string;
};

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, subcategoryId }: DeleteSubcategoryVariables) =>
      subcategoryApi.deleteSubcategory(categoryId, subcategoryId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });

      toast.success("Deleted subcategory");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
