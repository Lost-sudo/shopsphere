import { IProductService, IProductRepository } from "../interfaces/product.interface";
import { ICategoryRepository } from "../interfaces/category.interface";
import { ProductInput, UpdateProductInput, ProductQuery } from "../schemas/product.schema";
import { Product, ProductListResponse } from "../types/product.types";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";

export class ProductService implements IProductService {
    constructor(
        private productRepository: IProductRepository,
        private categoryRepository: ICategoryRepository
    ) { }

    async createProduct(input: ProductInput): Promise<Product> {
        const category = await this.categoryRepository.getCategoryById(input.categoryId);
        if (!category) {
            throw new BadRequestError("Invalid category ID");
        }

        const product = await this.productRepository.create(input);
        return product;
    }

    async listProducts(query: ProductQuery): Promise<ProductListResponse> {
        return await this.productRepository.findAll(query);
    }

    async getProduct(id: string): Promise<Product | null> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    }

    async updateProduct(id: string, input: Partial<UpdateProductInput>): Promise<Product | null> {
        if (input.categoryId) {
            const category = await this.categoryRepository.getCategoryById(input.categoryId);
            if (!category) {
                throw new BadRequestError("Invalid category ID");
            }
        }

        const product = await this.productRepository.update(id, input);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
        return product;
    }

    async deleteProduct(id: string): Promise<boolean> {
        const deleted = await this.productRepository.delete(id);
        if (!deleted) {
            throw new NotFoundError("Product not found");
        }
        return true;
    }
}
