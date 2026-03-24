import {
  ICategoryService,
  ICategoryRepository,
} from "../interfaces/category.interface";
import { CategoryInput, UpdateCategoryInput } from "../schemas/category.schema";
import { Category } from "../types/category.types";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";

export class CategoryService implements ICategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}
  async addNewCategory(input: CategoryInput): Promise<Category> {
    const newCategory = await this.categoryRepository.createCategory(input);

    if (!newCategory) {
      throw new BadRequestError("Failed to create new category");
    }

    return newCategory;
  }
  async listCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.getCategories();

    if (!categories) {
      throw new BadRequestError("Failed to fetch categories");
    }

    return categories;
  }
  async getCategory(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.getCategoryById(id);

    if (!category) {
      throw new NotFoundError("Category with the given ID does not exist.");
    }

    return category;
  }
  async updateExistingCategory(
    id: string,
    input: Partial<UpdateCategoryInput>,
  ): Promise<Category | null> {
    const updatedCategory = await this.categoryRepository.updateCategory(
      id,
      input,
    );

    if (!updatedCategory) {
      throw new BadRequestError("Failed to update category");
    }

    return updatedCategory;
  }
  async removeCategory(id: string): Promise<boolean> {
    const deletedCategory = await this.categoryRepository.deleteCategory(id);

    if (!deletedCategory) {
      throw new BadRequestError("Failed to delete category");
    }

    return deletedCategory;
  }
}
