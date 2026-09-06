import { Controller } from "../types/handlers";
import * as productService from "../services/product.service";
import { ProductQuerySchema } from "@cartzen/shared";

export const getProducts: Controller = async (req, res, next) => {
  try {
    const data = await productService.getProducts({
      filters: ProductQuerySchema.parse(req.query),
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getProductById: Controller = async (req, res, next) => {
  try {
    const product = await productService.getProductById({
      productId: req.params.productId as string,
    });

    res.status(200).json({ success: true, data: { product } });
  } catch (error) {
    next(error);
  }
};
