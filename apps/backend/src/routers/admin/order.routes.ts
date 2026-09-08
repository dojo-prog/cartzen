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

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router.get("/", readLimiter, getOrders);
router.post("/:orderId/status", writeLimiter, advanceOrderStatus);

export default router;
