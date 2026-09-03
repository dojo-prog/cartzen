import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShipping } from "../api/shipping.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useUpdateShipping = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateShipping,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippings"] });

      toast.success("Shipping policy updated");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
