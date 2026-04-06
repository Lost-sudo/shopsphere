import { ICartService, ICartRepository } from "../interfaces/cart.interface";
import { Cart, CartItem } from "../types/cart.types";
import { AddCartItemInput } from "../schemas/cart.schema";
import { NotFoundError } from "../utils/errors/notFoundError";
import { cartRepository } from "../repositories/cart.repository";

export class CartService implements ICartService {
  constructor(private readonly cartRepository: ICartRepository) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.createCart(userId);
    }
    return cart;
  }

  async addItem(userId: string, input: AddCartItemInput): Promise<CartItem> {
    const cart = await this.getCart(userId);

    // Check if item already exists in cart
    const existingItem = await this.cartRepository.getCartItem(
      cart.id,
      input.productId,
    );

    if (existingItem) {
      return await this.cartRepository.updateItemQuantity(
        existingItem.id,
        existingItem.quantity + input.quantity,
      );
    }

    return await this.cartRepository.addItemToCart(cart.id, input);
  }

  async updateItem(
    userId: string,
    itemId: string,
    quantity: number,
  ): Promise<CartItem> {
    const cart = await this.getCart(userId);

    // Safety check: ensure item belongs to user's cart
    const item = cart.items.find((i) => i.id === itemId);
    if (!item) {
      throw new NotFoundError("Cart item not found.");
    }

    return await this.cartRepository.updateItemQuantity(itemId, quantity);
  }

  async removeItem(userId: string, itemId: string): Promise<boolean> {
    const cart = await this.getCart(userId);

    const item = cart.items.find((i) => i.id === itemId);
    if (!item) {
      throw new NotFoundError("Cart item not found.");
    }

    return await this.cartRepository.removeItemFromCart(itemId);
  }

  async clearCart(userId: string): Promise<boolean> {
    const cart = await this.getCart(userId);
    return await this.cartRepository.clearCart(cart.id);
  }
}

export const cartService = new CartService(cartRepository);
