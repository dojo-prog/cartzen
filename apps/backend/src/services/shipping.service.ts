import {
  CreateShippingBody,
  Shipping,
  UpdateShippingBody,
} from "@cartzen/shared";

import AppError from "../utils/AppError";
import generateChanges from "../utils/generateChanges";
import {
  CalculateShippingParams,
  CalculateShippingResult,
  CreateShippingData,
  CreateShippingParams,
  UpdateShippingParams,
  UpdateShippingResult,
} from "../types/entities/shipping.types";
import { calculateDistanceMeters } from "../utils/calculateDistanceMeters";

import * as shippingRepository from "../repositories/shipping.repository";
import * as storeRepository from "../repositories/store.repository";
import * as addressRepository from "../repositories/address.repository";

export const getShippingDetails = async () => {
  return await shippingRepository.find();
};

export const createShipping = async (
  params: CreateShippingParams,
): Promise<Shipping> => {
  const { payload } = params;

  const existing = await shippingRepository.find();

  if (existing) {
    throw new AppError(400, "A shipping policy/rate has already been created");
  }

  const { baseFeeCents, feePerKmCents } = payload;

  const data: CreateShippingData = {
    ...payload,
    base_fee_cents: baseFeeCents,
    fee_per_km_cents: feePerKmCents,
  };

  return await shippingRepository.create(data);
};

export const updateShipping = async (
  params: UpdateShippingParams,
): Promise<UpdateShippingResult> => {
  const { payload } = params;

  const shipping = await shippingRepository.find();

  if (!shipping) {
    throw new AppError(400, "No shipping policy/rate has yet to be created");
  }

  const { baseFeeCents, feePerKmCents } = payload;

  const data: Partial<Shipping> = {
    ...payload,
    base_fee_cents: baseFeeCents,
    fee_per_km_cents: feePerKmCents,
  };

  const { old_values, new_values } = generateChanges(shipping, data);

  const updated = await shippingRepository.update(shipping.id, new_values);

  return {
    shipping: updated,
    old_values,
    new_values,
  };
};

export const deleteShipping = async (): Promise<Shipping> => {
  const shipping = await shippingRepository.find();

  if (!shipping) {
    throw new AppError(400, "No shipping policy/rate has yet to be created");
  }

  await shippingRepository.remove(shipping.id);

  return shipping;
};

export const calculateShipping = async (
  params: CalculateShippingParams,
): Promise<CalculateShippingResult> => {
  const { addressId, userId } = params;

  // =======================================
  // GET USER PROVIDED ADDRESS
  // =======================================

  const address = await addressRepository.findById(userId, addressId);

  if (!address) {
    throw new AppError(404, "Shipping address not found");
  }

  // =======================================
  // GET STORE ADDRESS
  // =======================================

  const storeAddress = await storeRepository.find();

  if (!storeAddress) {
    throw new AppError(400, "No store is currently registered");
  }

  const { latitude: storeLat, longitude: storeLon } = storeAddress;

  // =======================================
  // CALCULATE STRAIGHT-LINE DISTANCE
  // BETWEEN ADDRESSES
  // =======================================

  const shippingDistanceMeters = Math.round(
    calculateDistanceMeters(
      { lat: address.latitude, lon: address.longitude },
      { lat: storeLat, lon: storeLon },
    ),
  );

  // =======================================
  // GET SHIPPING METHOD
  // =======================================

  const shippingMethod = await shippingRepository.find();

  if (!shippingMethod) {
    throw new AppError(400, "No shipping method is registered currently");
  }

  const { base_fee_cents, fee_per_km_cents } = shippingMethod;

  const shippingFeeCents =
    base_fee_cents +
    Math.ceil(shippingDistanceMeters / 1000) * fee_per_km_cents;

  return {
    shipping_fee_cents: shippingFeeCents,
    shipping_distance_meters: shippingDistanceMeters,
    store_address: storeAddress,
  };
};
