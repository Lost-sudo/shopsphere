import z from "zod";
import { addressSchema } from "./address.schema";

export enum Carrier {
  JNT = "JNT",
  LBC = "LBC",
  FLASH = "FLASH",
  NINJAVAN = "NINJAVAN",
  OTHER = "OTHER",
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

export const shipmentSchema = z.object({
  orderId: z.uuid(),
  trackingNumber: z.string().min(1).max(100),
  carrier: z.nativeEnum(Carrier),
  status: z.nativeEnum(ShipmentStatus).default(ShipmentStatus.PENDING),
  shipping_fee: z.coerce.number().min(0),
  sender: addressSchema.or(z.any()),
  recipient: addressSchema.or(z.any()),
  weight: z.coerce.number().min(0),
});

export const createShipmentSchema = shipmentSchema.omit({
  shipping_fee: true,
  trackingNumber: true,
});

export const updateShipmentSchema = shipmentSchema
  .partial()
  .omit({ orderId: true });

export type ShipmentInput = z.infer<typeof shipmentSchema>;
export type CreateShipmentInput = z.infer<typeof createShipmentSchema>;
export type UpdateShipmentInput = z.infer<typeof updateShipmentSchema>;
