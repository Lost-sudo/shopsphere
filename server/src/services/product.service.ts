import { IProductService, IProductRepository } from "../interfaces/product.interface";
import { ICategoryRepository } from "../interfaces/category.interface";
import { ProductInput, UpdateProductInput, ProductQuery, ProductVariantInput, UpdateVariantInput } from "../schemas/product.schema";
import { Product, ProductListResponse, ProductVariant } from "../types/product.types";
import { BadRequestError } from "../utils/errors/badRequestError";
import { NotFoundError } from "../utils/errors/notFoundError";
import { productRepository } from "../repositories/product.repository";
import { categoryRepository } from "../repositories/category.repository";

export class ProductService implements IProductService {
    constructor(
        private productRepository: IProductRepository,
        private categoryRepository: ICategoryRepository
    ) { }

    // ─── Product methods ──────────────────────────────────────────────────────────

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

    // ─── Variant methods ──────────────────────────────────────────────────────────

    private async assertProductExists(productId: string): Promise<void> {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new NotFoundError("Product not found");
        }
    }

    async addVariant(productId: string, data: ProductVariantInput): Promise<ProductVariant> {
        await this.assertProductExists(productId);
        const variant = await this.productRepository.createVariant(productId, data);
        return variant;
    }

    async getVariants(productId: string): Promise<ProductVariant[]> {
        await this.assertProductExists(productId);
        return await this.productRepository.findVariantsByProductId(productId);
    }

    async getVariant(productId: string, variantId: string): Promise<ProductVariant> {
        await this.assertProductExists(productId);
        const variant = await this.productRepository.findVariantById(variantId);
        if (!variant || variant.productId !== productId) {
            throw new NotFoundError("Variant not found");
        }
        return variant;
    }

    async updateVariant(productId: string, variantId: string, data: Partial<UpdateVariantInput>): Promise<ProductVariant> {
        await this.assertProductExists(productId);

        const existing = await this.productRepository.findVariantById(variantId);
        if (!existing || existing.productId !== productId) {
            throw new NotFoundError("Variant not found");
        }

        const updated = await this.productRepository.updateVariant(variantId, data);
        if (!updated) {
            throw new NotFoundError("Variant not found");
        }
        return updated;
    }

    async removeVariant(productId: string, variantId: string): Promise<boolean> {
        await this.assertProductExists(productId);

        const existing = await this.productRepository.findVariantById(variantId);
        if (!existing || existing.productId !== productId) {
            throw new NotFoundError("Variant not found");
        }

        const deleted = await this.productRepository.deleteVariant(variantId);
        if (!deleted) {
            throw new NotFoundError("Variant not found");
        }
        return true;
    }
}

export const productService = new ProductService(productRepository, categoryRepository);
