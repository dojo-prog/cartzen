import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as subcategoryApi from "../api/admin-subcategory.api";

export const useDeleteSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subcategoryApi.deleteSubcategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subcategories"] });

      toast.success("Deleted subcategory");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
