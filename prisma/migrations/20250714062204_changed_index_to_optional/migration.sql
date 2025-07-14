-- AlterTable
ALTER TABLE "client_statuses" ALTER COLUMN "sortOrder" DROP NOT NULL,
ALTER COLUMN "sortOrder" DROP DEFAULT;
