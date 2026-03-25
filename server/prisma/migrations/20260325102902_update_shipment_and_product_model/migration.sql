/*
  Warnings:

  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Shipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "weight" DECIMAL(10,2) NOT NULL;

-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "weight" DECIMAL(10,2) NOT NULL;
