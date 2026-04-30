import prisma from "../config/db";
import { ICartRepository } from "../interfaces/cart.interface";
import { Cart, CartItem } from "../types/cart.types";
import { AddCartItemInput } from "../schemas/cart.schema";

export class CartRepository implements ICartRepository {
  private mapPrismaCartToCart(prismaCart: any): Cart {
    return {
      id: prismaCart.id,
      userId: prismaCart.userId,
      items: prismaCart.items.map((item: any) => ({
        id: item.id,
        cartId: item.cartId,
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        product: {
          name: item.product.name,
          price: Number(item.product.price),
          images: item.product.images,
          weight: Number(item.product.weight),
        },
        variant: item.variant
          ? {
            name: item.variant.name,
            value: item.variant.value,
            price: item.variant.price ? Number(item.variant.price) : null,
          }
          : null,
      })),
      createdAt: prismaCart.createdAt,
      updatedAt: prismaCart.updatedAt,
    };
  }

  async getCartByUserId(userId: string): Promise<Cart | null> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!cart) return null;
    return this.mapPrismaCartToCart(cart);
  }

  async createCart(userId: string): Promise<Cart> {
    const cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    return this.mapPrismaCartToCart(cart);
  }

  async addItemToCart(cartId: string, input: AddCartItemInput): Promise<CartItem> {
    const item = await prisma.cartItem.create({
      data: {
        cartId,
        productId: input.productId,
        variantId: input.variantId,
        quantity: input.quantity,
      },
      include: {
        product: true,
        variant: true,
      },
    });

    return {
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      product: {
        name: item.product.name,
        price: Number(item.product.price),
        images: item.product.images,
        weight: Number(item.product.weight),
      },
      variant: item.variant
        ? {
          name: item.variant.name,
          value: item.variant.value,
          price: item.variant.price ? Number(item.variant.price) : null,
        }
        : null,
    };
  }

  async updateItemQuantity(itemId: string, quantity: number): Promise<CartItem> {
    const item = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: true,
        variant: true,
      },
    });

    return {
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      product: {
        name: item.product.name,
        price: Number(item.product.price),
        images: item.product.images,
        weight: Number(item.product.weight),
      },
      variant: item.variant
        ? {
          name: item.variant.name,
          value: item.variant.value,
          price: item.variant.price ? Number(item.variant.price) : null,
        }
        : null,
    };
  }

  async removeItemFromCart(itemId: string): Promise<boolean> {
    await prisma.cartItem.delete({
      where: { id: itemId },
    });
    return true;
  }

  async clearCart(cartId: string): Promise<boolean> {
    await prisma.cartItem.deleteMany({
      where: { cartId },
    });
    return true;
  }

  async getCartItem(
    cartId: string,
    productId: string,
    variantId?: string,
  ): Promise<CartItem | null> {
    const item = await prisma.cartItem.findFirst({
      where: { cartId, productId, variantId: variantId || null },
      include: {
        product: true,
        variant: true,
      },
    });

    if (!item) return null;
    return {
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        name: item.product.name,
        price: Number(item.product.price),
        images: item.product.images,
        weight: Number(item.product.weight),
      },
    };
  }

  async removeItemsFromCart(
    userId: string,
    items: { productId: string; variantId?: string }[],
  ): Promise<boolean> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!cart) return false;

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        OR: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId || null,
        })),
      },
    });

    return true;
  }
}

export const cartRepository = new CartRepository();
