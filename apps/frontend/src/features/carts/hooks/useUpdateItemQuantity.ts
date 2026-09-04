import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import type {
  CartItemWithRelations,
  UpdateCartItemBody,
} from "@cartzen/shared";
import type { PaginatedResult } from "@/types/common";

import * as cartItemApi from "../api/cart.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

type UpdateItemQuantityVariables = {
  productId: string;
  body: UpdateCartItemBody;
};

type CartItemsPage = PaginatedResult<"cart_items", CartItemWithRelations>;

export const useUpdateItemQuantity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, body }: UpdateItemQuantityVariables) =>
      cartItemApi.updateItemQuantity(productId, body),

    onSuccess: (updated) => {
      queryClient.setQueriesData<InfiniteData<CartItemsPage>>(
        {
          queryKey: ["cart-items"],
        },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              cart_items: page.cart_items.map((item) =>
                item.product.id === updated.product.id ? updated : item,
              ),
            })),
          };
        },
      );

      queryClient.setQueryData<CartItemWithRelations[]>(
        ["all-cart-items"],
        (old) => {
          if (!old) return old;

          return old.map((ci) =>
            ci.product.id === updated.product.id ? updated : ci,
          );
        },
      );

      queryClient.invalidateQueries({ queryKey: ["cart-items-count"] });

      toast.success("Item quantity updated");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
