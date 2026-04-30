import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { IOrderService } from "../interfaces/order.interface";
import { OrderInput, UpdateOrderInput } from "../schemas/order.schema";
import { JwtPayload } from "../types";
import { orderService } from "@/services/order.service";

export class OrderController {
  constructor(private readonly orderService: IOrderService) {}

  createOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderInput = req.body as OrderInput;
    const authenticatedUser: JwtPayload = req.user!;
    const idempotencyKey = req.headers["x-idempotency-key"] as
      | string
      | undefined;

    const order = await this.orderService.createOrder(
      { ...orderInput, idempotencyKey },
      authenticatedUser.id,
    );

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  });

  getOrderById = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const order = await this.orderService.getOrderById(orderId as string);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  });

  getOrdersByUserId = asyncHandler(async (req: Request, res: Response) => {
    const authenticatedUser: JwtPayload = req.user!;
    const orders = await this.orderService.getOrdersByUserId(
      authenticatedUser.id,
    );

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  });

  getAllOrders = asyncHandler(async (req: Request, res: Response) => {
    const orders = await this.orderService.getAllOrders();

    res.status(200).json({
      success: true,
      message: "All orders fetched successfully",
      orders,
    });
  });

  updateOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const orderInput = req.body as UpdateOrderInput;
    const order = await this.orderService.updateOrder(
      orderId as string,
      orderInput,
    );

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order,
    });
  });

  deleteOrder = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    await this.orderService.deleteOrder(orderId as string);

    res.status(204).send();
  });

  processShipment = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.id;
    const { carrier } = req.body;
    const shipment = await this.orderService.processShipment(
      orderId as string,
      carrier,
    );

    res.status(200).json({
      success: true,
      message: "Shipment processed successfully",
      shipment,
    });
  });
}

export const orderController = new OrderController(orderService);
