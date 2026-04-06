import prisma from "../config/db";
import { ICategoryRepository } from "../interfaces/category.interface";
import { CategoryInput, UpdateCategoryInput } from "../schemas/category.schema";
import { Category } from "../types/category.types";

export class CategoryRepository implements ICategoryRepository {
    async createCategory(input: CategoryInput): Promise<Category> {
        return await prisma.category.create({
            data: {
                ...input,
            },
        });
    }
    async getCategories(): Promise<Category[]> {
        return await prisma.category.findMany();
    }
    async getCategoryById(id: string): Promise<Category | null> {
        return await prisma.category.findUnique({
            where: {
                id,
            },
        });
    }
    async updateCategory(
        id: string,
        input: Partial<UpdateCategoryInput>,
    ): Promise<Category | null> {
        return await prisma.category.update({
            where: {
                id,
            },
            data: {
                ...input,
            },
        });
    }
    async deleteCategory(id: string): Promise<boolean> {
        await prisma.category.delete({
            where: {
                id,
            },
        });
        return true;
    }
}

export const categoryRepository = new CategoryRepository();
