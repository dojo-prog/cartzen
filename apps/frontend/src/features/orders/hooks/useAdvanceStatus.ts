import { useMutation, useQueryClient } from "@tanstack/react-query";
import { advanceOrderStatus } from "../api/admin-order.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useAdvanceStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: advanceOrderStatus,

    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });

      toast.success(`Order set to ${order.status}`);
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
