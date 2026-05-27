import { IPaymentMethodProcessor } from "@/interfaces/payment_method.interface";
import { PaymentMethod } from "@/schemas/payment.schema";
import { CardPaymentMethod } from "@/payment_methods/card.method";
import { GcashPaymentMethod } from "@/payment_methods/gcash.method";
import { CodPaymentMethod } from "@/payment_methods/cod.method";
import { BadRequestError } from "@/utils/errors/badRequestError";

export class PaymentMethodFactory {
    static getPaymentMethod(method: PaymentMethod | string): IPaymentMethodProcessor {
        switch (method) {
            case PaymentMethod.CARD:
                return new CardPaymentMethod();
            case PaymentMethod.GCASH:
                return new GcashPaymentMethod();
            case PaymentMethod.COD:
                return new CodPaymentMethod();
            default:
                throw new BadRequestError(`Unknown payment method: ${method}`);
        }
    }
}
