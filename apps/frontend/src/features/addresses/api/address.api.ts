import { api } from "@/services/api/axios";
import type {
  CreateAddressBody,
  UpdateAddressBody,
  UserAddress,
} from "@cartzen/shared";

export const getUserAddresses = async (): Promise<UserAddress[]> => {
  const { data } = await api.get("/v1/addresses");

  return data.data.addresses;
};

export const getUserAddress = async (
  addressId: string,
): Promise<UserAddress> => {
  const { data } = await api.get(`/v1/addresses/${addressId}`);

  return data.data.address;
};

export const createAddress = async (
  body: CreateAddressBody,
): Promise<UserAddress> => {
  const { data } = await api.post("/v1/addresses", body);

  return data.data.address;
};

export const updateAddress = async (
  addressId: string,
  body: UpdateAddressBody,
): Promise<UserAddress> => {
  const { data } = await api.patch(`/v1/addresses/${addressId}`, body);

  return data.data.address;
};

export const deleteAddress = async (
  addressId: string,
): Promise<UserAddress> => {
  const { data } = await api.delete(`/v1/addresses/${addressId}`);

  return data.data.address;
};

export const setToDefault = async (addressId: string): Promise<UserAddress> => {
  const { data } = await api.patch(`/v1/addresses/${addressId}/default`);

  return data.data.address;
};
