import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { ICategoryService } from "../interfaces/category.interface";
import { categoryService } from "@/services/category.service";

export class CategoryController {
  constructor(private categoryService: ICategoryService) {}

  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categoryService.addNewCategory(req.body);
    res.status(201).json({
      status: "success",
      data: { category },
    });
  });

  getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await this.categoryService.listCategories();
    res.status(200).json({
      status: "success",
      results: categories.length,
      data: { categories },
    });
  });

  getCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categoryService.getCategory(
      req.params.id as string,
    );
    res.status(200).json({
      status: "success",
      data: { category },
    });
  });

  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await this.categoryService.updateExistingCategory(
      req.params.id as string,
      req.body,
    );
    res.status(200).json({
      status: "success",
      data: { category },
    });
  });

  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await this.categoryService.removeCategory(req.params.id as string);
    res.status(204).json({
      status: "success",
    });
  });
}

export const categoryController = new CategoryController(categoryService);
