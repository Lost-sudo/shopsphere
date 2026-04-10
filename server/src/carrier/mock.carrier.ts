import { ICarrier } from "../interfaces/carrier.interface";
import { CreateShipmentInput } from "../schemas/shipment.schema";
import { Shipment } from "../types/shipment.types";

export class MockCarrier implements ICarrier {
  constructor(private readonly carrierCode: string) {}

  async createShipment(data: CreateShipmentInput): Promise<Shipment> {
    const baseFee = 50;
    const fee = data.weight * 10.0;
    const totalFee = baseFee + fee;

    const trackingNumber = `${this.carrierCode}-${Date.now()}`;

    return {
      orderId: data.orderId,
      trackingNumber,
      carrier: data.carrier,
      status: data.status,
      shipping_fee: totalFee,
      sender: data.sender as any,
      recipient: data.recipient as any,
      weight: data.weight,
    };
  }
}

