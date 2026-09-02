import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../api/order.api";
import { handleApiError } from "@/utils/handleApiError";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
