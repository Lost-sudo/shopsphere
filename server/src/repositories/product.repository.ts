import prisma from "../config/db";
import { IProductRepository } from "../interfaces/product.interface";
import { ProductInput, UpdateProductInput, ProductQuery } from "../schemas/product.schema";
import { Product, ProductListResponse } from "../types/product.types";
import { Prisma } from "../generated/client";

export class ProductRepository implements IProductRepository {
    // Helper to transform Prisma result to our Product type
    private mapToProduct(prismaProduct: any): Product {
        return {
            ...prismaProduct,
            price: Number(prismaProduct.price),
            variants: prismaProduct.variants?.map((v: any) => ({
                ...v,
                price: v.price ? Number(v.price) : null,
            })) || [],
            category: prismaProduct.category ? {
                id: prismaProduct.category.id,
                name: prismaProduct.category.name,
            } : undefined,
        };
    }

    async create(data: ProductInput): Promise<Product> {
        const { variants, ...productData } = data;

        const createdProduct = await prisma.product.create({
            data: {
                ...productData,
                variants: {
                    create: variants,
                },
            },
            include: {
                variants: true,
                category: true,
            },
        });

        return this.mapToProduct(createdProduct);
    }

    async findAll(query: ProductQuery): Promise<ProductListResponse> {
        const { page, limit, search, minPrice, maxPrice, categoryId, sort, isActive } = query;
        const skip = (page - 1) * limit;

        const where: Prisma.ProductWhereInput = {};

        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
            ];
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined) where.price.gte = minPrice;
            if (maxPrice !== undefined) where.price.lte = maxPrice;
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        if (isActive !== undefined) {
            where.isActive = isActive;
        }

        let orderBy: Prisma.ProductOrderByWithRelationInput = {};
        switch (sort) {
            case "price_asc":
                orderBy = { price: "asc" };
                break;
            case "price_desc":
                orderBy = { price: "desc" };
                break;
            case "oldest":
                orderBy = { createdAt: "asc" };
                break;
            case "newest":
            default:
                orderBy = { createdAt: "desc" };
                break;
        }

        const [total, products] = await Promise.all([
            prisma.product.count({ where }),
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: limit,
                include: {
                    category: true,
                    variants: true,
                },
            }),
        ]);

        return {
            products: products.map(this.mapToProduct),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }

    async findById(id: string): Promise<Product | null> {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                variants: true,
                category: true,
            },
        });

        if (!product) return null;
        return this.mapToProduct(product);
    }

    async update(id: string, data: Partial<UpdateProductInput>): Promise<Product | null> {
        const { variants, ...productData } = data;

        // Transaction to handle variant updates if necessary
        // For simplicity, we'll update basic fields. Variant management might need specific methods or more complex logic.
        // If variants are provided, we will delete existing and recreate them for now (simplest full update),
        // or we could implement smarter diffing. Given the schema 'variants' is optional in update,
        // let's assume if it is provided, we replace.

        // However, Prisma makes deep updates tricky without explicit IDs.
        // Let's stick to updating product fields first. If variants are passed, we handle them.

        const updateData: any = { ...productData };

        if (variants) {
            updateData.variants = {
                deleteMany: {},
                create: variants,
            };
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: updateData,
            include: {
                variants: true,
                category: true,
            },
        });

        return this.mapToProduct(updatedProduct);
    }

    async delete(id: string): Promise<boolean> {
        try {
            await prisma.product.delete({ where: { id } });
            return true;
        } catch (error) {
            return false;
        }
    }
}
