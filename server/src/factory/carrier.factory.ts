import { ICarrier } from "../interfaces/carrier.interface";
import { JntCarrier } from "../carrier/jnt.carrier";
import { MockCarrier } from "../carrier/mock.carrier";
import { Carrier } from "../schemas/shipment.schema";

export class CarrierFactory {
  static getCarrier(carrier: Carrier | string): ICarrier {
    const normalized =
      typeof carrier === "string" ? carrier.toUpperCase().trim() : carrier;

    switch (carrier) {
      case Carrier.JNT:
        return new JntCarrier();
      case Carrier.LBC:
        return new MockCarrier("LBC");
      case Carrier.FLASH:
        return new MockCarrier("FLASH");
      case Carrier.NINJAVAN:
        return new MockCarrier("NINJAVAN");
      case Carrier.OTHER:
        return new MockCarrier("OTHER");
      default:
        switch (normalized) {
          case Carrier.JNT:
            return new JntCarrier();
          case Carrier.LBC:
          case Carrier.FLASH:
          case Carrier.NINJAVAN:
          case Carrier.OTHER:
            return new MockCarrier(normalized);
          default:
            throw new Error("Invalid carrier");
        }
    }
  }
}
