import express from "express";
import validate from "../middlewares/validation.middleware";
import {
  CreateSubcategoryBodySchema,
  SubcategoryIdParamsSchema,
  SubcategoryQuerySchema,
  SubcategorySlugParamsSchema,
  UpdateSubcategoryBodySchema,
} from "@cartzen/shared";
import {
  CategoryIdParamsSchema,
  CategorySlugParamsSchema,
} from "@cartzen/shared";
import { authorizeRoles, protectRoute } from "../middlewares/auth.middleware";
import {
  getAllSubcategories,
  getSubcategories,
  getSubcategoryBySlug,
} from "../controllers/subcategory.controller";
import {
  readLimiter,
  writeLimiter,
} from "../middlewares/rate.limit.middlewares";

const router = express.Router();

router.get("/subcategories/all", getAllSubcategories);

router.route("/:categorySlug/subcategories").get(
  readLimiter,
  validate({
    params: CategorySlugParamsSchema,
    query: SubcategoryQuerySchema,
  }),
  getSubcategories,
);

router.get(
  "/:categorySlug/subcategories/:subcategorySlug",
  readLimiter,
  validate({
    params: CategorySlugParamsSchema.merge(SubcategorySlugParamsSchema),
  }),
  getSubcategoryBySlug,
);

export default router;
