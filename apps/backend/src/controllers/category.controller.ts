import { Controller } from "../types/handlers";
import * as categoryService from "../services/category.service";
import { CategoryQuerySchema } from "@cartzen/shared";

export const getCategories: Controller = async (req, res, next) => {
  try {
    const data = await categoryService.getCategories({
      filters: CategoryQuerySchema.parse(req.query),
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAllCategories: Controller = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json({ success: true, data: { categories } });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBySlug: Controller = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryBySlug({
      categorySlug: req.params.categorySlug as string,
    });

    res.status(200).json({ success: true, data: { category } });
  } catch (error) {
    next(error);
  }
};
