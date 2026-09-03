import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStore } from "../api/store.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createStore,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });

      toast.success("Store details added");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
