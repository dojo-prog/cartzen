import { useQuery } from "@tanstack/react-query";

import * as addressApi from "../api/address.api";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: addressApi.getUserAddresses,
  });
};
