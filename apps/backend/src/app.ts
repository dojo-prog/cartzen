import express from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import ENV from "./config/env";

import { generalLimiter } from "./middlewares/rate.limit.middlewares";

import authRouter from "./routers/auth.routes";
import addressRouter from "./routers/address.routes";
import storeRouter from "./routers/store.routes";
import shippingRouter from "./routers/shipping.routes";
import categoryRouter from "./routers/category.routes";
import subcategoryRouter from "./routers/subcategory.routes";
import productRouter from "./routers/product.routes";
import inventoryRouter from "./routers/inventory.routes";
import cartItemRouter from "./routers/cart_item.routes";
import orderRouter from "./routers/order.routes";
import paymentRouter from "./routers/payment.routes";

import adminProductRouter from "./routers/admin/product.routes";
import adminOrderRouter from "./routers/admin/order.routes";
import adminCategoryRouter from "./routers/admin/category.routes";
import adminSubcategoryRouter from "./routers/admin/subcategory.routes";

import healtRouter from "./routers/health.routes";

const app = express();

// Cors Config
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);

// Parsers
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

// Global Rate Limiter
app.use(generalLimiter);

// Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/addresses", addressRouter);
app.use("/api/v1/store", storeRouter);
app.use("/api/v1/shipping", shippingRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/categories", subcategoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/products", inventoryRouter);
app.use("/api/v1/cart/items", cartItemRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/", paymentRouter);

// Admin Routers
app.use("/api/v1/admin/products", adminProductRouter);
app.use("/api/v1/admin/orders", adminOrderRouter);
app.use("/api/v1/admin/categories", adminCategoryRouter);
app.use("/api/v1/admin/subcategories", adminSubcategoryRouter);

// Health Router
app.use("/health", healtRouter);

// Error Handler
app.use(errorMiddleware);

export default app;
