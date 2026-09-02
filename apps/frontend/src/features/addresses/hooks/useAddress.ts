import { useQuery } from "@tanstack/react-query";

import * as addressApi from "../api/address.api";

export const useAddress = (addressId?: string) => {
  return useQuery({
    queryKey: ["addresses", addressId],
    queryFn: () => addressApi.getUserAddress(addressId!),
    enabled: !!addressId,
  });
};
