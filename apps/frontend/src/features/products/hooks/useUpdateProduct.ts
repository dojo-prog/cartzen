import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "../api/admin-product.api";
import type { ProductWithRelations, UpdateProductBody } from "@cartzen/shared";
import type { PaginatedResult } from "@/types/common";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

type UpdateProductVariables = {
  productId: string;
  body: UpdateProductBody & { thumbnail?: File };
};

export type ProductsPage = PaginatedResult<"products", ProductWithRelations>;

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, body }: UpdateProductVariables) =>
      updateProduct(productId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });

      toast.success("Updated product");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
