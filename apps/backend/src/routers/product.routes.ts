import express from "express";
import validate from "../middlewares/validation.middleware";
import { ProductIdParamsSchema, ProductQuerySchema } from "@cartzen/shared";
import { getProductById, getProducts } from "../controllers/product.controller";
import { readLimiter } from "../middlewares/rate.limit.middlewares";

const router = express.Router();

router
  .route("/")
  .get(readLimiter, validate({ query: ProductQuerySchema }), getProducts);

router
  .route("/:productId")
  .get(
    readLimiter,
    validate({ params: ProductIdParamsSchema }),
    getProductById,
  );

export default router;
