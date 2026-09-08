import express from "express";
import {
  authorizeRoles,
  protectRoute,
} from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validation.middleware";
import {
  CategoryIdParamsSchema,
  CreateSubcategoryBodySchema,
  SubcategoryIdParamsSchema,
  SubcategoryQuerySchema,
  UpdateSubcategoryBodySchema,
} from "@cartzen/shared";
import { writeLimiter } from "../../middlewares/rate.limit.middlewares";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  updateSubcategory,
} from "../../controllers/admin/subcategory.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router
  .route("/")
  .get(validate({ query: SubcategoryQuerySchema }), getSubcategories)
  .post(
    writeLimiter,
    validate({
      body: CreateSubcategoryBodySchema,
    }),
    createSubcategory,
  );

router
  .route("/:subcategoryId")
  .patch(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    validate({
      params: SubcategoryIdParamsSchema,
      body: UpdateSubcategoryBodySchema,
    }),
    updateSubcategory,
  )
  .delete(
    writeLimiter,
    protectRoute,
    authorizeRoles(["admin"]),
    validate({
      params: SubcategoryIdParamsSchema,
    }),
    deleteSubcategory,
  );

export default router;
