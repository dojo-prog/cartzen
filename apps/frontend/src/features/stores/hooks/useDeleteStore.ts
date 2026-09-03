import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStore } from "../api/store.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteStore,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });

      toast.success("Store details deleted");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
