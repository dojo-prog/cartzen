import express from "express";
import {
  authorizeRoles,
  protectRoute,
} from "../../middlewares/auth.middleware";
import { readLimiter } from "../../middlewares/rate.limit.middlewares";
import { getOrders } from "../../controllers/admin/order.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router.get("/", readLimiter, getOrders);

export default router;
