import { api } from "@/services/api/axios";
import type {
  CreateShippingBody,
  Shipping,
  Store,
  UpdateShippingBody,
  UserAddress,
} from "@cartzen/shared";

export const getShippingDetails = async (): Promise<Shipping> => {
  const { data } = await api.get("/v1/shipping");

  return data.data.shipping;
};

export const createShipping = async (
  body: CreateShippingBody,
): Promise<Shipping> => {
  const { data } = await api.post("/v1/shipping", body);

  return data.data.shipping;
};

export const updateShipping = async (
  body: UpdateShippingBody,
): Promise<Shipping> => {
  const { data } = await api.patch("/v1/shipping", body);

  return data.data.shipping;
};

export const deleteShipping = async (): Promise<Shipping> => {
  const { data } = await api.delete("/v1/shipping");

  return data.data.shipping;
};

export const calculateShipping = async (
  addressId: string,
): Promise<{
  shipping_fee_cents: number;
  shipping_distance_meters: number;
  store_address: Store;
}> => {
  const { data } = await api.get(`/v1/shipping/calculate/${addressId}`);

  return data.data;
};
