import { Category } from "@cartzen/shared";
import AppError from "../utils/AppError";
import {
  GetCategoriesParams,
  GetCategoriesResult,
  GetCategoryBySlugParams,
} from "../types/entities/category.types";

import * as categoryRepository from "../repositories/category.repository";

export const getCategories = async (
  params: GetCategoriesParams,
): Promise<GetCategoriesResult> => {
  const { filters } = params;

  const { categories, total } = await categoryRepository.find(filters);

  const { page, limit } = filters;

  return {
    categories,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
};

export const getAllCategories = async (): Promise<Category[]> => {
  return await categoryRepository.findAll();
};

export const getCategoryBySlug = async (
  params: GetCategoryBySlugParams,
): Promise<Category> => {
  const { categorySlug } = params;

  const category = await categoryRepository.findBySlug(categorySlug);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  return category;
};
