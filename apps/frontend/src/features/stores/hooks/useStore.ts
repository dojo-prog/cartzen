import { useQuery } from "@tanstack/react-query";
import { getStoreDetails } from "../api/store.api";

export const useStore = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStoreDetails,
  });
};
