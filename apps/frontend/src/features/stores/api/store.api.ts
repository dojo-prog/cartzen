import { api } from "@/services/api/axios";
import type { CreateStoreBody, Store, UpdateStoreBody } from "@cartzen/shared";

export const getStoreDetails = async (): Promise<Store> => {
  const { data } = await api.get("/v1/store");

  return data.data.store;
};

export const createStore = async (body: CreateStoreBody): Promise<Store> => {
  const { data } = await api.post("/v1/store", body);

  return data.data.store;
};

export const updateStore = async (body: UpdateStoreBody): Promise<Store> => {
  const { data } = await api.patch("/v1/store", body);

  return data.data.store;
};

export const deleteStore = async (): Promise<Store> => {
  const { data } = await api.delete("/v1/store");

  return data.data.store;
};
