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
        quantity: item.quantity,
        product: {
          name: item.product.name,
          price: Number(item.product.price),
          images: item.product.images,
        },
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
        quantity: input.quantity,
      },
      include: {
        product: true,
      },
    });

    return {
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        name: item.product.name,
        price: Number(item.product.price),
        images: item.product.images,
      },
    };
  }

  async updateItemQuantity(itemId: string, quantity: number): Promise<CartItem> {
    const item = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
      include: {
        product: true,
      },
    });

    return {
      id: item.id,
      cartId: item.cartId,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        name: item.product.name,
        price: Number(item.product.price),
        images: item.product.images,
      },
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

  async getCartItem(cartId: string, productId: string): Promise<CartItem | null> {
    const item = await prisma.cartItem.findFirst({
      where: { cartId, productId },
      include: {
        product: true,
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
      },
    };
  }
}
