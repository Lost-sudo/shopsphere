/*
  Warnings:

  - You are about to drop the column `carrier` on the `Shipment` table. All the data in the column will be lost.
  - Added the required column `shippingMethod` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "carrier",
ADD COLUMN     "shippingMethod" TEXT NOT NULL;
