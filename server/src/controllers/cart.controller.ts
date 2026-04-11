import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { ICartService } from "../interfaces/cart.interface";
import { JwtPayload } from "../types";
import { cartService } from "@/services/cart.service";

export class CartController {
  constructor(private readonly cartService: ICartService) {}

  getCart = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const cart = await this.cartService.getCart(authenticatedUser.id);

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: { cart },
    });
  });

  addItem = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    await this.cartService.addItem(authenticatedUser.id, req.body);
    const cart = await this.cartService.getCart(authenticatedUser.id);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      data: { cart },
    });
  });

  updateItem = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const itemId = req.params.itemId as string;
    const { quantity } = req.body;

    await this.cartService.updateItem(
      authenticatedUser.id,
      itemId,
      quantity,
    );
    const cart = await this.cartService.getCart(authenticatedUser.id);

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      data: { cart },
    });
  });

  removeItem = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const itemId = req.params.itemId as string;

    await this.cartService.removeItem(authenticatedUser.id, itemId);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: { success: true }
    });
  });

  clearCart = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;

    await this.cartService.clearCart(authenticatedUser.id);

    res.status(200).json({
      success: true,
      message: "Cart cleared",
    });
  });
}

export const cartController = new CartController(cartService);
