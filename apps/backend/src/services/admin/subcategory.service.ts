import { Subcategory, SubcategoryWithRelations } from "@cartzen/shared";
import {
  CreateSubcategoryData,
  CreateSubcategoryParams,
  DeleteSubcategoryParams,
  GetSubcategoriesParams,
  GetSubcategoriesResult,
  UpdateSubcategoryParams,
  UpdateSubcategoryResult,
} from "../../types/entities/subcategory.types";
import AppError from "../../utils/AppError";
import generateSlug from "../../utils/generateSlug";
import generateChanges from "../../utils/generateChanges";

import * as subcategoryRepository from "../../repositories/subcategory.repository";

export const getSubcategories = async (
  params: GetSubcategoriesParams,
): Promise<GetSubcategoriesResult> => {
  const { filters } = params;

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

export const createSubcategory = async (
  params: CreateSubcategoryParams,
): Promise<SubcategoryWithRelations> => {
  const { payload } = params;

  const { categoryId, name } = payload;

  const existing = await subcategoryRepository.findByName(categoryId, name);

  if (existing) {
    throw new AppError(
      400,
      `A subcategory named (${name}) is already registered in this category`,
    );
  }

  const slug = generateSlug(name);

  const data: CreateSubcategoryData = {
    category_id: categoryId,
    name,
    slug,
  };

  return await subcategoryRepository.add(data);
};

export const updateSubcategory = async (
  params: UpdateSubcategoryParams,
): Promise<UpdateSubcategoryResult> => {
  const { subcategoryId, payload } = params;
  const { name, categoryId } = payload;

  const subcategory = await subcategoryRepository.findById(categoryId);

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found");
  }

  const mod: Partial<Subcategory> = {
    name,
    category_id: categoryId,
  };

  const { old_values, new_values } = generateChanges(subcategory, mod);

  if (new_values.name) {
    new_values.slug = generateSlug(new_values.name as string);
    old_values.slug = subcategory.slug;
  }

  const updated = await subcategoryRepository.update(
    categoryId,
    subcategoryId,
    new_values,
  );

  return {
    subcategory: updated,
    old_values,
    new_values,
  };
};

export const deleteSubcategory = async (
  params: DeleteSubcategoryParams,
): Promise<Subcategory> => {
  const { subcategoryId } = params;

  const subcategory = await subcategoryRepository.findById(subcategoryId);

  if (!subcategory) {
    throw new AppError(404, "Subcategory not found");
  }

  await subcategoryRepository.remove(subcategoryId);

  return subcategory;
};
