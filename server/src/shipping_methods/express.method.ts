import { Shipment } from "@/types/shipment.types";
import { CreateShippingInput } from "@/schemas/shipment.schema";
import { IShippingMethod } from "@/interfaces/shipping_method.interface";

export class ExpressShippingMethod implements IShippingMethod {
    async createShippingMethod(data: CreateShippingInput): Promise<Shipment> {
        const baseFee = 150; // Per 500g
        const rate = 30; // Per additional 500g (higher for express)
        const _30kgLimit = 30 * 1000; // 30kg in gram

        // Enforce weight limit
        if (data.weight > _30kgLimit) {
            throw new Error("Express shipping does not support packages over 30kg.");
        }

        // Calculate fee
        let fee = baseFee;
        if (data.weight > 500) {
            const extraWeight = data.weight - 500;
            const extraFee = Math.ceil(extraWeight / 500) * rate;
            fee += extraFee;
        }

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
