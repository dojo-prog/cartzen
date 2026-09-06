import AppError from "../utils/AppError";
import {
  GetProductParams,
  GetProductsParams,
  GetProductsResult,
} from "../types/entities/product.types";

import * as productRepository from "../repositories/product.repository";

export const getProducts = async (
  params: GetProductsParams,
): Promise<GetProductsResult> => {
  const { filters } = params;

  const { products, total } = await productRepository.find(filters);

  const { page, limit } = filters;

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (params: GetProductParams) => {
  const { productId } = params;

  const product = await productRepository.findWithRelationsById(productId);

  if (!product) {
    throw new AppError(404, "Product not found");
  }

  return product;
};
