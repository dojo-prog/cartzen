import type { UpdateInventoryBody } from "@cartzen/shared";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { updateProductInventory } from "../api/inventory.api";
import type { ProductsPage } from "@/features/products/hooks/useUpdateProduct";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

type UpdateProductInventoryVariables = {
  productId: string;
  body: UpdateInventoryBody;
};

export const useUpdateProductInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, body }: UpdateProductInventoryVariables) =>
      updateProductInventory(productId, body),

    onSuccess: (updatedProduct) => {
      queryClient.setQueriesData<InfiniteData<ProductsPage>>(
        { queryKey: ["products"] },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              products: page.products.map((p) =>
                p.id === updatedProduct.id ? updatedProduct : p,
              ),
            })),
          };
        },
      );

      toast.success("Updated product inventory counts");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
