import { Controller } from "../types/handlers";
import * as subcategoryService from "../services/subcategory.service";
import { SubcategoryQuerySchema } from "@cartzen/shared";

export const getSubcategories: Controller = async (req, res, next) => {
  try {
    const data = await subcategoryService.getSubcategories({
      filters: SubcategoryQuerySchema.parse(req.query),
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAllSubcategories: Controller = async (req, res, next) => {
  try {
    const subcategories = await subcategoryService.getAllSubcategories();

    res.status(200).json({ success: true, data: { subcategories } });
  } catch (error) {
    next(error);
  }
};

export const getSubcategoryBySlug: Controller = async (req, res, next) => {
  try {
    const subcategory = await subcategoryService.getSubcategoryBySlug({
      categorySlug: req.params.categorySlug as string,
      subcategorySlug: req.params.subcategorySlug as string,
    });

    res.status(200).json({ success: true, data: { subcategory } });
  } catch (error) {
    next(error);
  }
};
