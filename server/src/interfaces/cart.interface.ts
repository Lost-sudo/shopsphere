import { AddCartItemInput } from "../schemas/cart.schema";
import { Cart, CartItem } from "../types/cart.types";

export interface ICartRepository {
  getCartByUserId(userId: string): Promise<Cart | null>;
  createCart(userId: string): Promise<Cart>;
  addItemToCart(cartId: string, input: AddCartItemInput): Promise<CartItem>;
  updateItemQuantity(itemId: string, quantity: number): Promise<CartItem>;
  removeItemFromCart(itemId: string): Promise<boolean>;
  clearCart(cartId: string): Promise<boolean>;
  getCartItem(cartId: string, productId: string, variantId?: string): Promise<CartItem | null>;
}

export interface ICartService {
  getCart(userId: string): Promise<Cart>;
  addItem(userId: string, input: AddCartItemInput): Promise<CartItem>;
  updateItem(userId: string, itemId: string, quantity: number): Promise<CartItem>;
  removeItem(userId: string, itemId: string): Promise<boolean>;
  clearCart(userId: string): Promise<boolean>;
}
