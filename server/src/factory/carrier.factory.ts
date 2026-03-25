import { ICarrier } from "../interfaces/carrier.interface";
import { JntCarrier } from "../carrier/jnt.carrier";

export class CarrierFactory {
  static getCarrier(carrier: string): ICarrier {
    switch (carrier) {
      case "JNT":
        return new JntCarrier();
      default:
        throw new Error("Invalid carrier");
    }
  }
}
