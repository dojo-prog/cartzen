import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleApiError } from "@/utils/handleApiError";

import * as authApi from "../api/auth.api";

export const useRegister = () => {
  return useMutation({
    mutationFn: authApi.register,

    onSuccess: () => {
      toast.success("Signup successful");
    },

    onError: (error) => {
      handleApiError(error);
    },
  });
};
