import express from "express";
import {
  authorizeRoles,
  protectRoute,
} from "../../middlewares/auth.middleware";
import {
  readLimiter,
  writeLimiter,
} from "../../middlewares/rate.limit.middlewares";
import {
  advanceOrderStatus,
  cancelOrder,
  getOrders,
} from "../../controllers/admin/order.controller";
import validate from "../../middlewares/validation.middleware";
import { OrderIdParamsSchema } from "@cartzen/shared";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router.get("/", readLimiter, getOrders);
router.patch(
  "/:orderId/status",
  writeLimiter,
  validate({ params: OrderIdParamsSchema }),
  advanceOrderStatus,
);

router.patch(
  "/:orderId/cancel",
  writeLimiter,
  validate({ params: OrderIdParamsSchema }),
  cancelOrder,
);

export default router;
