import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as categoryApi from "../api/categories.api";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: categoryApi.deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast.success("Category deleted");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
