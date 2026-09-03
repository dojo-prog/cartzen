import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStore } from "../api/store.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStore,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });

      toast.success("Store details updated");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
