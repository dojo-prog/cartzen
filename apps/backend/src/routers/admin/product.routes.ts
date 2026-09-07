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
  toggleFeatured,
  updateProduct,
} from "../../controllers/admin/product.controller";
import multerUpload from "../../middlewares/multer.middleware";
import { writeLimiter } from "../../middlewares/rate.limit.middlewares";

const router = express.Router();

router.use(protectRoute, authorizeRoles(["admin"]));

router
  .route("/")
  .get(validate({ query: ProductQuerySchema }), getProducts)
  .post(
    multerUpload.single("thumbnail"),
    validate({ body: CreateProductBodySchema }),
    createProduct,
  );

router.get("/stats", getProductStats);

router
  .route("/:productId")
  .patch(
    validate({ params: ProductIdParamsSchema, body: UpdateProductBodySchema }),
    updateProduct,
  )
  .delete(validate({ params: ProductIdParamsSchema }), deleteProduct);

router.patch(
  "/:productId/featured",
  writeLimiter,
  validate({ params: ProductIdParamsSchema }),
  toggleFeatured,
);

export default router;
