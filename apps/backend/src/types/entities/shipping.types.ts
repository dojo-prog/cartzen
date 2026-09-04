import { Shipping, Store, UserAddress } from "@cartzen/shared";
import { UpdateResult } from "./common";

// =======================================
// SERVICE PARAMS
// =======================================

export interface BaseShippingPayload {
  name: string;
  baseFeeCents: number;
  feePerKmCents: number;
}

export interface CreateShippingParams {
  payload: BaseShippingPayload;
}

export interface UpdateShippingParams {
  payload: BaseShippingPayload;
}

export interface CalculateShippingParams {
  addressId: string;
  userId: string;
}

// =======================================
// REPOSITORY DATA
// =======================================

export interface CreateShippingData {
  name: string;
  base_fee_cents: number;
  fee_per_km_cents: number;
}

// =======================================
// RESULT
// =======================================

export type UpdateShippingResult = UpdateResult<"shipping", Shipping>;

export type CalculateShippingResult = {
  shipping_fee_cents: number;
  shipping_distance_meters: number;
  store_address: Store;
};
