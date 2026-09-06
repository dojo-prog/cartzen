import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/admin-product.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Created new product");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
