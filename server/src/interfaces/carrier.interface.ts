import { Shipment } from "../types/shipment.types";
import { CreateShipmentInput } from "../schemas/shipment.schema";

export interface ICarrier {
  createShipment(data: CreateShipmentInput): Promise<Shipment>;
}
