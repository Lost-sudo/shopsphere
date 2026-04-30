import { ICartService, ICartRepository } from "../interfaces/cart.interface";
import { Cart, CartItem } from "../types/cart.types";
import { AddCartItemInput } from "../schemas/cart.schema";
import { NotFoundError } from "../utils/errors/notFoundError";
import { BadRequestError } from "../utils/errors/badRequestError";
import { cartRepository } from "../repositories/cart.repository";
import { IProductService } from "../interfaces/product.interface";
import { productService } from "./product.service";

export class CartService implements ICartService {
  constructor(
    private readonly cartRepository: ICartRepository,
    private readonly productService: IProductService,
  ) {}

  async getCart(userId: string): Promise<Cart> {
    let cart = await this.cartRepository.getCartByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.createCart(userId);
    }
    return cart;
  }

  async addItem(userId: string, input: AddCartItemInput): Promise<CartItem> {
    await this.productService.validateVariantSelection(input.productId, input.variantId);
    const product = await this.productService.getProduct(input.productId);
    if (!product) throw new NotFoundError("Product not found");

    let availableStock = product.stock || 0;
    if (input.variantId) {
      const variant = await this.productService.getVariant(input.productId, input.variantId);
      availableStock = variant.stock;
    }

    const cart = await this.getCart(userId);

    // Check if item already exists in cart
    const existingItem = await this.cartRepository.getCartItem(
      cart.id,
      input.productId,
      input.variantId,
    );

    const totalQuantityRequested = (existingItem?.quantity || 0) + input.quantity;

    if (totalQuantityRequested > availableStock) {
      throw new BadRequestError(
        availableStock === 0 
          ? "This item is currently out of stock." 
          : `Only ${availableStock} items available in stock.`
      );
    }

    if (existingItem) {
      return await this.cartRepository.updateItemQuantity(
        existingItem.id,
        totalQuantityRequested,
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

    // Check available stock
    const product = await this.productService.getProduct(item.productId);
    if (!product) throw new NotFoundError("Product not found");

    let availableStock = product.stock || 0;
    if (item.variantId) {
      const variant = await this.productService.getVariant(item.productId, item.variantId);
      availableStock = variant.stock;
    }

    if (quantity > availableStock) {
      throw new BadRequestError(`Only ${availableStock} items available in stock.`);
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

  async removeItemsFromCart(userId: string, items: { productId: string; variantId?: string }[]): Promise<boolean> {
    return await this.cartRepository.removeItemsFromCart(userId, items);
  }
}

export const cartService = new CartService(cartRepository, productService);
