import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../api/order.api";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.removeQueries({ queryKey: ["cart-items"] });

      toast.success("Order placed");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
