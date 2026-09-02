import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as addressApi from "../api/address.api";
import type { UserAddress } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.createAddress,

    onSuccess: (address) => {
      queryClient.setQueryData<UserAddress[]>(["addresses"], (old) => {
        if (!old) return [address];

        return [address, ...old];
      });

      toast.success("Added address to your record");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
