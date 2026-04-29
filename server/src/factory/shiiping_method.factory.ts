import { IShippingMethod } from "@/interfaces/shipping_method.interface";
import { StandardShippingMethod } from "@/shipping_methods/standard.method";
import { ExpressShippingMethod } from "@/shipping_methods/express.method";
import { ShippingMethod } from "@/schemas/shipment.schema";


export class ShippingMethodFactory {
    static getShippingMethod(method: ShippingMethod | string): IShippingMethod {

        switch (method) {
            case ShippingMethod.STANDARD:
                return new StandardShippingMethod();
            case ShippingMethod.EXPRESS:
                return new ExpressShippingMethod();
            default:
                throw new Error(`Unknown shipping method: ${method}`);
        }
    }
}