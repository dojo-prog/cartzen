import express from "express";
import {
  authorizeRoles,
  protectRoute,
} from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validation.middleware";
import {
  CreateProductBodySchema,
  ProductIdParamsSchema,
  ProductQuerySchema,
  UpdateProductBodySchema,
} from "@cartzen/shared";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductStats,
  updateProduct,
} from "../../controllers/admin/product.controller";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router
  .route("/")
  .get(validate({ query: ProductQuerySchema }), getProducts)
  .post(validate({ body: CreateProductBodySchema }), createProduct);

router.get("/stats", getProductStats);

router
  .route("/:productId")
  .patch(
    validate({ params: ProductIdParamsSchema, body: UpdateProductBodySchema }),
    updateProduct,
  )
  .delete(validate({ params: ProductIdParamsSchema }), deleteProduct);

export default router;
