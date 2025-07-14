-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_statusId_fkey";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "statusId" DROP NOT NULL,
ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "client_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
