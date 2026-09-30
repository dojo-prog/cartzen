import axios, { type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { ApiError } from "./errors";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const api = axios.create({
  baseURL: env.environment === "production" ? env.apiUrl : env.devApiUrl,
  withCredentials: true,
  timeout: 10_000,
});

const refreshApi = axios.create({
  baseURL: env.environment === "production" ? env.apiUrl : env.devApiUrl,
  withCredentials: true,
  timeout: 10_000,
});

export const refreshAccessToken = async () => {
  await refreshApi.post("/v1/auth/refresh");
};

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    const config = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status === 401 && config && !config._retry) {
      config._retry = true;

      try {
        await refreshAccessToken();

        return api(config);
      } catch {
        // Refresh failed.
      }
    }

    const response = error.response;

    return Promise.reject(
      new ApiError(
        response?.data?.message ?? "Something went wrong",
        response?.status,
        response?.data?.code,
        response?.data,
      ),
    );
  },
);

export { api };
