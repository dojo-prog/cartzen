import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShipping } from "../api/shipping.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useDeleteShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteShipping,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippings"] });

      toast.success("Shipping policy removed");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
