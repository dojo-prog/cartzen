import { api } from "@/services/api/axios";

import type { LoginBody, RegisterBody, UserPublic } from "@cartzen/shared";

export const getCurrentUser = async (): Promise<UserPublic> => {
  const { data } = await api.get("/v1/auth/me");

  return data.data.user;
};

export const register = async (body: RegisterBody): Promise<UserPublic> => {
  const { data } = await api.post("/v1/auth/register", body);

  return data.data.use;
};

export const login = async (body: LoginBody): Promise<UserPublic> => {
  const { data } = await api.post("/v1/auth/login", body);

  return data.data.use;
};

export const logout = async (): Promise<void> => {
  await api.post("/v1/auth/logout");
};
