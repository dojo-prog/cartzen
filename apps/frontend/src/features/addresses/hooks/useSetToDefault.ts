import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserAddress } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as addressApi from "../api/address.api";

export const useSetToDefault = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.setToDefault,

    onSuccess: (updated) => {
      queryClient.setQueryData<UserAddress[]>(["addresses"], (old) => {
        if (!old) return old;

        return old.map((address) =>
          address.id === updated.id ? updated : address,
        );
      });

      queryClient.setQueryData(["addresses", updated.id], updated);

      toast.success("Address successfully set to default");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
