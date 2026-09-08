import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCancelOrder } from "../api/admin-order.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useAdminCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminCancelOrder,
    onSuccess: () => {
      (queryClient.invalidateQueries({ queryKey: ["admin-orders"] }),
        toast.success("Order cancelled"));
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};
