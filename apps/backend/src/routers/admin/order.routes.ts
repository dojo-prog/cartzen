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
  getOrders,
} from "../../controllers/admin/order.controller";
import validate from "../../middlewares/validation.middleware";
import { OrderIdParamsSchema } from "@cartzen/shared";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router.get("/", readLimiter, getOrders);
router
  .route("/:orderId/status")
  .patch(
    writeLimiter,
    validate({ params: OrderIdParamsSchema }),
    advanceOrderStatus,
  );

export default router;
