import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../api/product.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      toast.success("Product deleted");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
