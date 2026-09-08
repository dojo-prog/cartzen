import { Controller } from "../../types/handlers";
import { OrderQuerySchema } from "@cartzen/shared";

import * as orderService from "../../services/admin/order.service";

export const getOrders: Controller = async (req, res, next) => {
  try {
    const data = await orderService.getOrders(
      OrderQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const advanceOrderStatus: Controller = async (req, res, next) => {
  try {
    const order = await orderService.advanceOrderStatus(
      req.params.orderId as string,
    );

    res.status(200).json({ success: true, data: { order } });
  } catch (error) {
    next(error);
  }
};

export const cancelOrder: Controller = async (req, res, next) => {
  try {
    const order = await orderService.cancelOrder(req.params.orderId as string);

    res.status(200).json({ success: true, data: { order } });
  } catch (error) {
    next(error);
  }
};
