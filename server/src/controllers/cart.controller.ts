import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { ICartService } from "../interfaces/cart.interface";
import { JwtPayload } from "../types";

export class CartController {
  constructor(private readonly cartService: ICartService) {}

  getCart = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const cart = await this.cartService.getCart(authenticatedUser.id);

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart,
    });
  });

  addItem = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const item = await this.cartService.addItem(authenticatedUser.id, req.body);

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      item,
    });
  });

  updateItem = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const itemId = req.params.itemId as string;
    const { quantity } = req.body;

    const item = await this.cartService.updateItem(authenticatedUser.id, itemId, quantity);

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      item,
    });
  });

  removeItem = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser = req.user as JwtPayload;
    const itemId = req.params.itemId as string;

    await this.cartService.removeItem(authenticatedUser.id, itemId);

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
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
