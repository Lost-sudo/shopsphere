import { IShipmentRepository } from "../interfaces/shipment.interface";
import { Shipment } from "../generated/client";
import { CreateShippingInput } from "../schemas/shipment.schema";
import prisma from "../config/db";

export class ShipmentRepository implements IShipmentRepository {
  createShipment(data: CreateShippingInput): Promise<Shipment> {
    return prisma.shipment.create({
      data: {
        orderId: data.orderId,
        shippingMethod: data.shippingMethod,
        status: data.status,
        shipping_fee: data.shipping_fee!,
        sender: data.sender,
        recipient: data.recipient,
        weight: data.weight,
        trackingNumber: data.trackingNumber!,
      },
    });
  }
}

export const shipmentRepository = new ShipmentRepository();
