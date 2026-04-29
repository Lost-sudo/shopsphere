import z from "zod";
import { addressSchema } from "./address.schema";

export enum ShippingMethod {
  STANDARD = "STANDARD",
  EXPRESS = "EXPRESS",
}

export enum ShipmentStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
  FAILED = "FAILED",
}

export const shippingMethodSchema = z.object({
  orderId: z.uuid(),
  trackingNumber: z.string().min(1).max(100),
  shippingMethod: z.nativeEnum(ShippingMethod),
  status: z.nativeEnum(ShipmentStatus).default(ShipmentStatus.PENDING),
  shipping_fee: z.coerce.number().min(0),
  sender: addressSchema.or(z.any()),
  recipient: addressSchema.or(z.any()),
  weight: z.coerce.number().min(0),
});

export const createShippingMethodSchema = shippingMethodSchema.extend({
  shipping_fee: z.number().optional(),
  trackingNumber: z.string().optional(),
});

export type CreateShippingInput = z.infer<typeof createShippingMethodSchema>;
export type UpdateShipmentInput = z.infer<typeof createShippingMethodSchema>;
