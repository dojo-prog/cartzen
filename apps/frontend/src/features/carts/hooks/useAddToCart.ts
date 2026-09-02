import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as cartItemApi from "../api/cart.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartItemApi.addToCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });

      toast.success("Product added to cart");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
