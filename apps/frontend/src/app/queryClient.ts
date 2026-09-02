import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "@/services/api/errors";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,

      gcTime: 5 * 60_000,

      retry: (failureCount, error) => {
        if (
          error instanceof ApiError &&
          error.status &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }

        return failureCount < 2;
      },

      refetchOnWindowFocus: true,
      refetchOnReconnect: true,

      throwOnError: (error) => {
        return error instanceof ApiError && (error.status ?? 0) >= 500;
      },
    },

    mutations: {
      retry: 0,
    },
  },
});
