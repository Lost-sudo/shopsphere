import { Carrier, ShipmentStatus } from "../schemas/shipment.schema";

export type Sender = {
  name: string;
  phoneNumber: string;
  address: string;
};

export type Recipient = {
  name: string;
  phoneNumber: string;
  address: string;
};

export type Shipment = {
  orderId: string;
  trackingNumber: string;
  carrier: Carrier;
  status: ShipmentStatus;
  shipping_fee: number;
  sender: Sender;
  recipient: Recipient;
  weight: number;
};
