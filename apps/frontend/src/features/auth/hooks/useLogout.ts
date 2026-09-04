import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as authApi from "../api/auth.api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,

    onSuccess: () => {
      queryClient.setQueryData(["current-user"], null);

      toast.success("Logout successful");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
