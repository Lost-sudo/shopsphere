import { IShipmentService } from "../interfaces/shipment.interface";
import { IShipmentRepository } from "../interfaces/shipment.interface";
import { Shipment } from "../generated/client";
import {
  ShippingMethod,
  CreateShippingInput,
  ShipmentStatus,
} from "../schemas/shipment.schema";
import { ShippingMethodFactory } from "@/factory/shiiping_method.factory";
import { shipmentRepository } from "../repositories/shipment.repository";

export class ShipmentService implements IShipmentService {
  constructor(private readonly shipmentRepository: IShipmentRepository) { }

  async createShipment(data: CreateShippingInput): Promise<Shipment> {
    const method = ShippingMethodFactory.getShippingMethod(data.shippingMethod);

    const createdShipment = await method.createShippingMethod(data);

    const shipment = await this.shipmentRepository.createShipment({
      orderId: createdShipment.orderId,
      trackingNumber: createdShipment.trackingNumber,
      shippingMethod: createdShipment.shippingMethod as ShippingMethod,
      status: createdShipment.status as ShipmentStatus,
      shipping_fee: createdShipment.shipping_fee,
      sender: createdShipment.sender,
      recipient: createdShipment.recipient,
      weight: createdShipment.weight,
    });

    return shipment;
  }
}

export const shipmentService = new ShipmentService(shipmentRepository);
