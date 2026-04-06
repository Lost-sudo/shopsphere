import { IShipmentRepository } from "../interfaces/shipment.interface";
import { Shipment } from "../generated/client";
import { ShipmentInput } from "../schemas/shipment.schema";
import prisma from "../config/db";

export class ShipmentRepository implements IShipmentRepository {
  createShipment(data: ShipmentInput): Promise<Shipment> {
    return prisma.shipment.create({
      data: {
        orderId: data.orderId,
        trackingNumber: data.trackingNumber,
        carrier: data.carrier,
        status: data.status,
        shipping_fee: data.shipping_fee,
        sender: data.sender,
        recipient: data.recipient,
        weight: data.weight,
      },
    });
  }
}

export const shipmentRepository = new ShipmentRepository();
