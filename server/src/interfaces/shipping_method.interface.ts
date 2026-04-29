import { Shipment } from "../types/shipment.types";
import { CreateShippingInput } from "../schemas/shipment.schema";

export interface IShippingMethod {
    createShippingMethod(data: CreateShippingInput): Promise<Shipment>;
}

export interface IShippingMethodService {
    createShippingMethod(data: CreateShippingInput): Promise<Shipment>;
}
