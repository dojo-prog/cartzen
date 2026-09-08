import {
  CreateSubcategoryBody,
  SubcategoryQuerySchema,
  UpdateSubcategoryBody,
} from "@cartzen/shared";
import { Controller } from "../../types/handlers";

import * as subcategoryService from "../../services/admin/subcategory.service";

export const getSubcategories: Controller = async (req, res, next) => {
  try {
    const data = await subcategoryService.getSubcategories(
      SubcategoryQuerySchema.parse(req.query),
    );

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createSubcategory: Controller = async (req, res, next) => {
  try {
    const subcategory = await subcategoryService.createSubcategory({
      payload: req.body as CreateSubcategoryBody,
    });

    res.status(201).json({
      success: true,
      message: "Subcategory created",
      data: { subcategory },
    });
  } catch (error) {
    next(error);
  }
};

export const updateSubcategory: Controller = async (req, res, next) => {
  try {
    const data = await subcategoryService.updateSubcategory({
      payload: req.body as UpdateSubcategoryBody,
      subcategoryId: req.params.subcategoryId as string,
    });

    res.status(200).json({ success: true, message: "Category updated", data });
  } catch (error) {
    next(error);
  }
};

export const deleteSubcategory: Controller = async (req, res, next) => {
  try {
    const subcategory = await subcategoryService.deleteSubcategory({
      subcategoryId: req.params.subcategoryId as string,
    });

    res.status(200).json({
      success: true,
      message: "Subcategory deleted",
      data: { subcategory },
    });
  } catch (error) {
    next(error);
  }
};
