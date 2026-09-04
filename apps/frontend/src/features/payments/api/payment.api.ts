import { api } from "@/services/api/axios";
import type { OrderWithItems, Payment } from "@cartzen/shared";

export const getPaymentDetails = async (
  paymentId: string,
): Promise<Payment> => {
  const { data } = await api.get(`/v1/payments/${paymentId}`);

  return data.data.payment;
};

export const getPaymentByOrder = async (orderId: string): Promise<Payment> => {
  const { data } = await api.get(`/v1/orders/${orderId}/payments`);

  return data.data.payment;
};

export const payOrder = async (orderId: string): Promise<OrderWithItems> => {
  const { data } = await api.post(`/v1/orders/${orderId}/payments`);

  return data.data.order;
};
