import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as authApi from "../api/auth.api";

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,

    onSuccess: (user) => {
      queryClient.setQueryData(["current-user"], user);

      toast.success("Signup successful");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
