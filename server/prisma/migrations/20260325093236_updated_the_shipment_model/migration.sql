/*
  Warnings:

  - Added the required column `recipient` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_fee` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "recipient" TEXT NOT NULL,
ADD COLUMN     "sender" TEXT NOT NULL,
ADD COLUMN     "shipping_fee" DECIMAL(10,2) NOT NULL;
