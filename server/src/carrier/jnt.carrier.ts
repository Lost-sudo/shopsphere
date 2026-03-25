import { Shipment } from "../types/shipment.types";
import { CreateShipmentInput } from "../schemas/shipment.schema";
import { ICarrier } from "../interfaces/carrier.interface";

export class JntCarrier implements ICarrier {
  async createShipment(data: CreateShipmentInput): Promise<Shipment> {
    // Update this later to real J&T API

    // Simulate shipping fee
    const baseFee = 50;
    const fee = data.weight * 10.0;
    const totalFee = baseFee + fee;

    // Simulate tracking number
    const trackingNumber = `JNT-${Date.now()}`;

    // Create shipment
    const shipment: Shipment = {
      orderId: data.orderId,
      trackingNumber: trackingNumber,
      carrier: data.carrier,
      status: data.status,
      shipping_fee: totalFee,
      sender: data.sender,
      recipient: data.recipient,
      weight: data.weight,
    };

    // Return shipment
    return shipment;
  }
}
