import { Subcategory } from "@cartzen/shared";
import AppError from "../utils/AppError";

import * as subcategoryRepository from "../repositories/subcategory.repository";
import * as categoryRepository from "../repositories/category.repository";
import {
  GetSubcategoriesParams,
  GetSubcategoriesResult,
  GetSubcategoryBySlugParams,
} from "../types/entities/subcategory.types";

export const getSubcategories = async (
  params: GetSubcategoriesParams,
): Promise<GetSubcategoriesResult> => {
  const { categorySlug, filters } = params;

  const category = await categoryRepository.findBySlug(categorySlug);

  if (!category) {
    throw new AppError(404, "Category not found");
  }

  const { subcategories, total } = await subcategoryRepository.find(filters);

  const { page, limit } = filters;

  return {
    subcategories,
    pagination: {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
    },
  };
};

export const getAllSubcategories = async (): Promise<
  Partial<Subcategory>[]
> => {
  return await subcategoryRepository.findAll();
};

export const getSubcategoryBySlug = async (
  params: GetSubcategoryBySlugParams,
): Promise<Subcategory> => {
  const { categorySlug, subcategorySlug } = params;

  const subcategory = await subcategoryRepository.findBySlug(
    categorySlug,
    subcategorySlug,
  );

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found");
  }

  return subcategory;
};
