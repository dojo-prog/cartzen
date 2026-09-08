import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as subcategoryApi from "../api/admin-subcatgory.api";

export const useCreateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: subcategoryApi.createSubcategory,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subcategories"] });

      toast.success("Created new subcategory");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
