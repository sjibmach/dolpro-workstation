-- CreateEnum
CREATE TYPE "ClientStatusId" AS ENUM ('new', 'contacting', 'failedContact', 'interested', 'offerToSend', 'offerSent', 'negotiation', 'contactLater', 'activeWithoutContract', 'contracted', 'inactive', 'notInterested', 'blacklisted');

-- AlterTable
ALTER TABLE "client_statuses" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "statusId" SET DEFAULT 'new';
