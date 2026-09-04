import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as cartItemApi from "../api/cart.api";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartItemApi.removeItemFromCart,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });

      queryClient.invalidateQueries({
        queryKey: ["cart-items-count"],
      });

      toast.success("Item removed from cart");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
