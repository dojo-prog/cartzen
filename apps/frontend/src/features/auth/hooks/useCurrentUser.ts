import { useQuery } from "@tanstack/react-query";

import * as authApi from "../api/auth.api";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: () => authApi.getCurrentUser(),
  });
};
