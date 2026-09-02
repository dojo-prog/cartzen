import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as authApi from "../api/auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: authApi.login,

    onSuccess: () => {
      toast.success("Login successful");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
