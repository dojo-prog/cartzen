import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateAddressBody, UserAddress } from "@cartzen/shared";

import * as addressApi from "../api/address.api";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

type UpdateAddressVariables = {
  addressId: string;
  body: UpdateAddressBody;
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ addressId, body }: UpdateAddressVariables) =>
      addressApi.updateAddress(addressId, body),

    onSuccess: (updated) => {
      queryClient.setQueryData<UserAddress[]>(["addresses"], (old) => {
        if (!old) return old;

        return old.map((address) =>
          address.id === updated.id ? updated : address,
        );
      });

      queryClient.setQueryData(["addresses", updated.id], updated);

      toast.success("Address updated");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
