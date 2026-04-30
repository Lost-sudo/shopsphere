import { Shipment } from "@/types/shipment.types";
import { CreateShippingInput } from "@/schemas/shipment.schema";
import { IShippingMethod } from "@/interfaces/shipping_method.interface";

export class ExpressShippingMethod implements IShippingMethod {
    async createShippingMethod(data: CreateShippingInput): Promise<Shipment> {
        const _30kgLimit = 30 * 1000; // 30kg in gram

        // Enforce weight limit
        if (data.weight > _30kgLimit) {
            throw new Error("Express shipping does not support packages over 30kg.");
        }

        // Calculate fee: 150 PHP for every 500g
        const fee = Math.ceil(data.weight / 500) * 150;

        // Simulate tracking number
        const trackingNumber = `EXPRESS-${Date.now()}`;

        // Create shipment
        const shipment: Shipment = {
            orderId: data.orderId,
            trackingNumber: trackingNumber,
            shippingMethod: data.shippingMethod,
            status: data.status,
            shipping_fee: fee,
            sender: data.sender,
            recipient: data.recipient,
            weight: data.weight,
        };

        // Return shipment
        return shipment;
    }
}
