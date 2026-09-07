import { Controller } from "../../types/handlers";

import * as orderService from "../../services/admin/order.service";
import { OrderQuerySchema } from "@cartzen/shared";

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
