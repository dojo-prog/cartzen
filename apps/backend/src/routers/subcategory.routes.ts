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
  createSubcategory,
  deleteSubcategory,
  getAllSubcategories,
  getSubcategories,
  getSubcategoryBySlug,
  updateSubcategory,
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

router.post(
  "/:categoryId/subcategories",
  writeLimiter,
  protectRoute,
  authorizeRoles(["admin"]),
  validate({
    params: CategoryIdParamsSchema,
    body: CreateSubcategoryBodySchema,
  }),
  createSubcategory,
);

router.get(
  "/:categorySlug/subcategories/:subcategorySlug",
  readLimiter,
  validate({
    params: CategorySlugParamsSchema.merge(SubcategorySlugParamsSchema),
  }),
  getSubcategoryBySlug,
);

router
  .route("/:categoryId/subcategories/:subcategoryId")
  .patch(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    validate({
      params: CategoryIdParamsSchema.merge(SubcategoryIdParamsSchema),
      body: UpdateSubcategoryBodySchema,
    }),
    updateSubcategory,
  )
  .delete(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    validate({
      params: CategoryIdParamsSchema.merge(SubcategoryIdParamsSchema),
    }),
    deleteSubcategory,
  );

export default router;
