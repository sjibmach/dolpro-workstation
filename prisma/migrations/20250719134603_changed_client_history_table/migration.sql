/*
  Warnings:

  - You are about to drop the column `fieldName` on the `client_histories` table. All the data in the column will be lost.
  - You are about to drop the column `newValue` on the `client_histories` table. All the data in the column will be lost.
  - You are about to drop the column `oldValue` on the `client_histories` table. All the data in the column will be lost.
  - You are about to drop the column `statusId` on the `client_histories` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `client_histories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "client_histories" DROP CONSTRAINT "client_histories_statusId_fkey";

-- AlterTable
ALTER TABLE "client_histories" DROP COLUMN "fieldName",
DROP COLUMN "newValue",
DROP COLUMN "oldValue",
DROP COLUMN "statusId",
DROP COLUMN "type",
ADD COLUMN     "followUpDate" TIMESTAMP(3),
ADD COLUMN     "newStatusId" TEXT,
ADD COLUMN     "reasonId" TEXT;

-- AddForeignKey
ALTER TABLE "client_histories" ADD CONSTRAINT "client_histories_newStatusId_fkey" FOREIGN KEY ("newStatusId") REFERENCES "client_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_histories" ADD CONSTRAINT "client_histories_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "client_status_reasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
