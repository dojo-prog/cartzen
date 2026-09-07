import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFeatured } from "../api/admin-product.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useToggleFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFeatured,
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });

      const { is_featured } = product;

      const toastMsg = is_featured
        ? "Product set to featured"
        : "Product removed from featured";

      toast.success(toastMsg);
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
