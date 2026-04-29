import z from "zod";
import { ShippingMethod } from "./shipment.schema";

export const orderItemSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().int().min(1),
  price: z.number().min(0),
});

export const orderSchema = z.object({
  userId: z.uuid(),
  items: z.array(orderItemSchema),
  totalAmount: z.number().min(0),
  shippingAddress: z.string().min(1),
  paymentMethod: z.string().min(1),
  idempotencyKey: z.string().optional(),
  status: z.string().optional().default("pending"),
});

export const updateOrderSchema = orderSchema.partial();

export const orderQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.string().optional(),
  userId: z.uuid().optional(),
});

export const processShipmentSchema = z.object({
  carrier: z.nativeEnum(ShippingMethod),
});

export type OrderItemInput = z.infer<typeof orderItemSchema>;
export type OrderInput = z.infer<typeof orderSchema>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
export type OrderQuery = z.infer<typeof orderQuerySchema>;
export type ProcessShipmentInput = z.infer<typeof processShipmentSchema>;
