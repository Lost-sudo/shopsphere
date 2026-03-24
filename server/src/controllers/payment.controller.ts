import { Request, Response } from "express";
import { asyncHandler } from "../middlewares/async.middleware";
import { IPaymentService } from "../interfaces/payment.interface";

export class PaymentController {
  constructor(private readonly paymentService: IPaymentService) {}

  processPayment = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const { paymentMethod } = req.body;

    const payment = await this.paymentService.processPayment(orderId, paymentMethod);

    res.status(200).json({
      success: true,
      message: "Payment processed successfully",
      payment,
    });
  });

  getPaymentByOrderId = asyncHandler(async (req: Request, res: Response) => {
    const orderId = req.params.orderId as string;
    const payment = await this.paymentService.getPaymentByOrderId(orderId);

    res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      payment,
    });
  });
}
