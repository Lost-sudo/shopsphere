import { IShipmentService } from "../interfaces/shipment.interface";
import { IShipmentRepository } from "../interfaces/shipment.interface";
import { Shipment } from "../generated/client";
import { CreateShipmentInput } from "../schemas/shipment.schema";
import { CarrierFactory } from "../factory/carrier.factory";
import { shipmentRepository } from "../repositories/shipment.repository";

export class ShipmentService implements IShipmentService {
  constructor(private readonly shipmentRepository: IShipmentRepository) {}

  async createShipment(data: CreateShipmentInput): Promise<Shipment> {
    const carrier = CarrierFactory.getCarrier(data.carrier);

    const create_shipment = await carrier.createShipment(data);

    const shipment = await this.shipmentRepository.createShipment({
      orderId: create_shipment.orderId,
      trackingNumber: create_shipment.trackingNumber,
      carrier: create_shipment.carrier as any,
      status: create_shipment.status as any,
      shipping_fee: create_shipment.shipping_fee,
      sender: create_shipment.sender,
      recipient: create_shipment.recipient,
      weight: create_shipment.weight,
    });

    return shipment;
  }
}

export const shipmentService = new ShipmentService(shipmentRepository);
