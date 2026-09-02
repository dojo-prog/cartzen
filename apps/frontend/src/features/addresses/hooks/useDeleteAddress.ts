import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UserAddress } from "@cartzen/shared";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as addressApi from "../api/address.api";

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addressApi.deleteAddress,

    onSuccess: (deleted) => {
      queryClient.setQueryData<UserAddress[]>(["addresses"], (old) => {
        if (!old) return old;

        return old.filter((address) => address.id !== deleted.id);
      });

      queryClient.removeQueries({
        queryKey: ["addresses", deleted.id],
      });

      toast.success("Address deleted");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
