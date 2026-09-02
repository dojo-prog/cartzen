import type { AddStockToInventoryBody } from "@cartzen/shared";
import {
  useMutation,
  useQueryClient,
  type InfiniteData,
} from "@tanstack/react-query";
import { addInventoryStock } from "../api/inventory.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";
import type { ProductsPage } from "@/features/products/hooks/useUpdateProduct";

type AddInventoryStockVariables = {
  productId: string;
  body: AddStockToInventoryBody;
};

export const useAddInventoryStock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, body }: AddInventoryStockVariables) =>
      addInventoryStock(productId, body),

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

      toast.success("Product stock increased");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
