import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../api/order.api";
import { handleApiError } from "@/utils/handleApiError";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: checkout,

    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["user-orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.removeQueries({ queryKey: ["all-cart-items"] });
      queryClient.removeQueries({ queryKey: ["cart-items-count"] });

      toast.success("Order placed");
      navigate(`/payments/${order.id}`);
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
