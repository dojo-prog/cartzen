import { env } from "@/config/env";
import { ApiError } from "./errors";
import axios from "axios";

const api = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  timeout: 10_000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const response = error.response;

      return Promise.reject(
        new ApiError(
          response?.data?.message ?? "Something went wrong",
          response?.status,
          response?.data?.code,
          response?.data,
        ),
      );
    }

    return Promise.reject(error);
  },
);

export { api };
