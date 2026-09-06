import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { updateProduct } from "../api/product.api";
import type { ProductWithRelations, UpdateProductBody } from "@cartzen/shared";
import type { PaginatedResult } from "@/types/common";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

type UpdateProductVariables = {
  productId: string;
  body: UpdateProductBody;
};

export type ProductsPage = PaginatedResult<"products", ProductWithRelations>;

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, body }: UpdateProductVariables) =>
      updateProduct(productId, body),

    onSuccess: (updated) => {
      queryClient.setQueriesData<InfiniteData<ProductsPage>>(
        {
          queryKey: ["admin-products"],
        },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              products: page.products.map((p) =>
                p.id === updated.id ? updated : p,
              ),
            })),
          };
        },
      );

      toast.success("Updated product");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
