import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShipping } from "../api/shipping.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useCreateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createShipping,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippings"] });

      toast.success("Shipping policy created");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
