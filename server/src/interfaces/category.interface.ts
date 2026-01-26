import { Category } from "../types/category.types";
import { CategoryInput, UpdateCategoryInput } from "../schemas/category.schema";

export interface ICategoryRepository {
    createCategory(input: CategoryInput): Promise<Category>;
    getCategories(): Promise<Category[]>;
    getCategoryById(id: string): Promise<Category | null>;
    updateCategory(
        id: string,
        input: Partial<UpdateCategoryInput>,
    ): Promise<Category | null>;
    deleteCategory(id: string): Promise<boolean>;
}

export interface ICategoryService {
    addNewCategory(input: CategoryInput): Promise<Category>;
    listCategories(): Promise<Category[]>;
    getCategory(id: string): Promise<Category | null>;
    updateExistingCategory(
        id: string,
        input: Partial<UpdateCategoryInput>,
    ): Promise<Category | null>;
    removeCategory(id: string): Promise<boolean>;
}
