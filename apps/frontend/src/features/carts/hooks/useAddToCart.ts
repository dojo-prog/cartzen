import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as cartItemApi from "../api/cart.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
import type { CartItemWithRelations } from "@cartzen/shared";

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cartItemApi.addToCart,

    onSuccess: (added) => {
      queryClient.invalidateQueries({
        queryKey: ["cart-items"],
      });

      queryClient.setQueryData<CartItemWithRelations[]>(
        ["all-cart-items"],
        (old) => {
          if (!old) return [added];

          return [added, ...old];
        },
      );

      queryClient.invalidateQueries({ queryKey: ["cart-items-count"] });

      toast.success("Product added to cart");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
