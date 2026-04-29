import { Shipment } from "../generated/client";
import { CreateShippingInput } from "../schemas/shipment.schema";

export interface IShipmentRepository {
  createShipment(data: CreateShippingInput): Promise<Shipment>;
}

export interface IShipmentService {
  createShipment(data: CreateShippingInput): Promise<Shipment>;
  // calculateShippingFee();
  // trackShipment();
  // cancelShipment();
  // getShipment();
  // getShipmentHistory();
  // getShipmentByTrackingNumber();
  // updateShipment();
}
