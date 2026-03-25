/*
  Warnings:

  - Added the required column `firstName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `recipient` on the `Shipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `sender` on the `Shipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shipment" DROP COLUMN "recipient",
ADD COLUMN     "recipient" JSONB NOT NULL,
DROP COLUMN "sender",
ADD COLUMN     "sender" JSONB NOT NULL;
