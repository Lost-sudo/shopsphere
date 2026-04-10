import { IShipmentService } from "../interfaces/shipment.interface";
import { IShipmentRepository } from "../interfaces/shipment.interface";
import { Shipment } from "../generated/client";
import {
  Carrier,
  CreateShipmentInput,
  ShipmentStatus,
} from "../schemas/shipment.schema";
import { CarrierFactory } from "../factory/carrier.factory";
import { shipmentRepository } from "../repositories/shipment.repository";

export class ShipmentService implements IShipmentService {
  constructor(private readonly shipmentRepository: IShipmentRepository) {}

  async createShipment(data: CreateShipmentInput): Promise<Shipment> {
    const carrier = CarrierFactory.getCarrier(data.carrier);

    const createdShipment = await carrier.createShipment(data);

    const shipment = await this.shipmentRepository.createShipment({
      orderId: createdShipment.orderId,
      trackingNumber: createdShipment.trackingNumber,
      carrier: createdShipment.carrier as Carrier,
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
