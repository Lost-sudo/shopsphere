import prisma from "../config/db";
import { IProductRepository } from "../interfaces/product.interface";
import {
  ProductInput,
  UpdateProductInput,
  ProductQuery,
  ProductVariantInput,
  UpdateVariantInput,
} from "../schemas/product.schema";
import {
  Product,
  ProductListResponse,
  ProductVariant,
} from "../types/product.types";
import { Prisma } from "../generated/client";

export class ProductRepository implements IProductRepository {
  // ─── Helpers ─────────────────────────────────────────────────────────────────

  private mapToProduct(prismaProduct: any): Product {
    return {
      ...prismaProduct,
      price: Number(prismaProduct.price),
      variants:
        prismaProduct.variants?.map((v: any) => this.mapToVariant(v)) || [],
      categories:
        prismaProduct.categories?.map((pc: any) => ({
          id: pc.category.id,
          name: pc.category.name,
        })) || [],
    };
  }

  private mapToVariant(v: any): ProductVariant {
    return {
      ...v,
      price: v.price !== null && v.price !== undefined ? Number(v.price) : null,
    };
  }

  // ─── Product CRUD ─────────────────────────────────────────────────────────────

  async create(data: ProductInput): Promise<Product> {
    const { variants, categoryIds, ...productData } = data;

    const createdProduct = await prisma.product.create({
      data: {
        ...productData,
        images: productData.images || [],
        isActive: productData.isActive ?? true,
        categories: {
          create: categoryIds.map((id: string) => ({ categoryId: id })),
        },
        variants: {
          create: variants || [],
        },
      },
      include: {
        variants: true,
        categories: { include: { category: true } },
      },
    });

    return this.mapToProduct(createdProduct);
  }

  async findAll(query: ProductQuery): Promise<ProductListResponse> {
    const {
      page,
      limit,
      search,
      minPrice,
      maxPrice,
      categoryId,
      sort,
      isActive,
    } = query;
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
      where.categories = {
        some: {
          categoryId: categoryId,
        },
      };
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
          categories: { include: { category: true } },
          variants: true,
        },
      }),
    ]);

    return {
      products: products.map((p) => this.mapToProduct(p)),
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
        categories: { include: { category: true } },
      },
    });

    if (!product) return null;
    return this.mapToProduct(product);
  }

  async update(
    id: string,
    data: Partial<UpdateProductInput>,
  ): Promise<Product | null> {
    const { variants, categoryIds, ...productData } = data;

    const updateData: any = { ...productData };

    if (categoryIds) {
      updateData.categories = {
        deleteMany: {},
        create: categoryIds.map((id: string) => ({ categoryId: id })),
      };
    }

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
        categories: { include: { category: true } },
      },
    });

    return this.mapToProduct(updatedProduct);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.product.delete({
        where: { id },
      });
      return true;
    } catch (error: any) {
      console.error("Delete product error:", error);
      return false;
    }
  }

  // ─── Variant CRUD ─────────────────────────────────────────────────────────────

  async createVariant(
    productId: string,
    data: ProductVariantInput,
  ): Promise<ProductVariant> {
    const variant = await prisma.productVariant.create({
      data: { ...data, productId },
    });
    return this.mapToVariant(variant);
  }

  async findVariantsByProductId(productId: string): Promise<ProductVariant[]> {
    const variants = await prisma.productVariant.findMany({
      where: { productId },
    });
    return variants.map((v) => this.mapToVariant(v));
  }

  async reduceStock(id: string, quantity: number): Promise<void> {
    await prisma.product.update({
      where: { id },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }

  async reduceVariantStock(variantId: string, quantity: number): Promise<void> {
    await prisma.productVariant.update({
      where: { id: variantId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    });
  }

  async findVariantById(variantId: string): Promise<ProductVariant | null> {
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });
    if (!variant) return null;
    return this.mapToVariant(variant);
  }

  async updateVariant(
    variantId: string,
    data: Partial<UpdateVariantInput>,
  ): Promise<ProductVariant | null> {
    try {
      const variant = await prisma.productVariant.update({
        where: { id: variantId },
        data,
      });
      return this.mapToVariant(variant);
    } catch (error) {
      return null;
    }
  }

  async deleteVariant(variantId: string): Promise<boolean> {
    try {
      await prisma.productVariant.delete({ where: { id: variantId } });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const productRepository = new ProductRepository();
