import { api } from "@/services/api/axios";

import type { LoginBody, RegisterBody } from "@cartzen/shared";

export const getCurrentUser = async () => {
  const { data } = await api.get("/v1/auth/me");

  return data;
};

export const register = async (body: RegisterBody) => {
  const { data } = await api.post("/v1/auth/register", body);

  return data;
};

export const login = async (body: LoginBody) => {
  const { data } = await api.post("/v1/auth/login", body);

  return data;
};

export const logout = async () => {
  await api.post("/v1/auth/logout");
};
