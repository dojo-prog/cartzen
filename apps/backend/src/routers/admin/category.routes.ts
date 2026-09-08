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
  CategoryIdParamsSchema,
  CreateCategoryBodySchema,
  UpdateCategoryBodySchema,
} from "@cartzen/shared";
import validate from "../../middlewares/validation.middleware";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router
  .route("/")
  .get(readLimiter, getCategories)
  .post(
    writeLimiter,
    validate({ body: CreateCategoryBodySchema }),
    createCategory,
  );

router
  .route("/:categoryId")
  .patch(
    writeLimiter,
    validate({
      params: CategoryIdParamsSchema,
      body: UpdateCategoryBodySchema,
    }),
    updateCategory,
  )
  .delete(
    writeLimiter,
    validate({ params: CategoryIdParamsSchema }),
    deleteCategory,
  );

export default router;
