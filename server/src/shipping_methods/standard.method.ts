import { Shipment } from "@/types/shipment.types";
import { CreateShippingInput } from "@/schemas/shipment.schema";
import { IShippingMethod } from "@/interfaces/shipping_method.interface";

export class StandardShippingMethod implements IShippingMethod {
    async createShippingMethod(data: CreateShippingInput): Promise<Shipment> {
        const baseFee = 50; // Per 500g ? Lower the price if less than 500g
        const rate = 15; // Per additional 500g
        const _30kgLimit = 30 * 1000; // 30kg in gram

        // Enforce weight limit
        if (data.weight > _30kgLimit) {
            throw new Error("Standard shipping does not support packages over 30kg.");
        }

        // Calculate fee
        let fee = baseFee;
        if (data.weight > 500) {
            const extraWeight = data.weight - 500;
            const extraFee = Math.ceil(extraWeight / 500) * rate;
            fee += extraFee;
        }

        // Simulate tracking number
        const trackingNumber = `STANDARD-${Date.now()}`;

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