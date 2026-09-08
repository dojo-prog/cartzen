import express from "express";
import validate from "../middlewares/validation.middleware";
import { CategoryQuerySchema, CategorySlugParamsSchema } from "@cartzen/shared";
import {
  getAllCategories,
  getCategories,
  getCategoryBySlug,
} from "../controllers/category.controller";
import { readLimiter } from "../middlewares/rate.limit.middlewares";

const router = express.Router();

router
  .route("/")
  .get(readLimiter, validate({ query: CategoryQuerySchema }), getCategories);

router.get("/all", getAllCategories);

router.get(
  "/:categorySlug",
  readLimiter,
  validate({ params: CategorySlugParamsSchema }),
  getCategoryBySlug,
);

export default router;
