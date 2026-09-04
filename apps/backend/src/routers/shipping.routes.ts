import express from "express";
import { authorizeRoles, protectRoute } from "../middlewares/auth.middleware";
import {
  AddressParamsSchema,
  CreateShippingBodySchema,
  UpdateShippingBodySchema,
} from "@cartzen/shared";
import validate from "../middlewares/validation.middleware";
import {
  calculateShipping,
  createShipping,
  deleteShipping,
  getShippingDetails,
  updateShipping,
} from "../controllers/shipping.controller";
import {
  readLimiter,
  writeLimiter,
} from "../middlewares/rate.limit.middlewares";

const router = express.Router();

router
  .route("/")
  .get(readLimiter, getShippingDetails)
  .post(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    validate({ body: CreateShippingBodySchema }),
    createShipping,
  )
  .patch(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    validate({ body: UpdateShippingBodySchema }),
    updateShipping,
  )
  .delete(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    deleteShipping,
  );

router.get(
  "/calculate/:addressId",
  protectRoute,
  validate({ params: AddressParamsSchema }),
  calculateShipping,
);

export default router;
