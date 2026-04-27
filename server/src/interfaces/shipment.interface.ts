import { Shipment } from "../generated/client";
import { ShipmentInput, CreateShipmentInput } from "../schemas/shipment.schema";

export interface IShipmentRepository {
  createShipment(data: ShipmentInput): Promise<Shipment>;
}

export interface IShipmentService {
  createShipment(data: CreateShipmentInput): Promise<Shipment>;
  // calculateShippingFee();
  // trackShipment();
  // cancelShipment();
  // getShipment();
  // getShipmentHistory();
  // getShipmentByTrackingNumber();
  // updateShipment();
}
