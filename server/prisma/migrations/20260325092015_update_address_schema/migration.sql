/*
  Warnings:

  - You are about to drop the column `state` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barangay` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VerificationType" AS ENUM ('EMAIL_VERIFICATION', 'EMAIL_UPDATE', 'PASSWORD_RESET');

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "state",
ADD COLUMN     "barangay" TEXT NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "idempotencyKey" TEXT;

-- AlterTable
ALTER TABLE "VerificationToken" ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "type" "VerificationType" NOT NULL DEFAULT 'EMAIL_VERIFICATION';

-- CreateIndex
CREATE UNIQUE INDEX "Order_idempotencyKey_key" ON "Order"("idempotencyKey");
