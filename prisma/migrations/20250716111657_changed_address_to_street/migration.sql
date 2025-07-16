/*
  Warnings:

  - You are about to drop the column `address` on the `client_contactpersons` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `interpreters` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `job_contactpersons` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "client_contactpersons" DROP COLUMN "address",
ADD COLUMN     "street" TEXT;

-- AlterTable
ALTER TABLE "interpreters" DROP COLUMN "address",
ADD COLUMN     "street" TEXT;

-- AlterTable
ALTER TABLE "job_contactpersons" DROP COLUMN "address",
ADD COLUMN     "street" TEXT;
