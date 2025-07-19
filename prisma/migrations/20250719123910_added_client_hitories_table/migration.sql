-- CreateEnum
CREATE TYPE "ClientHistoryType" AS ENUM ('note', 'statusChange', 'fieldChange');

-- CreateTable
CREATE TABLE "client_histories" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "type" "ClientHistoryType" NOT NULL,
    "fieldName" TEXT,
    "oldValue" TEXT,
    "newValue" TEXT,
    "statusId" TEXT,
    "note" TEXT,
    "creatorId" TEXT NOT NULL,
    "updatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client_histories" ADD CONSTRAINT "client_histories_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_histories" ADD CONSTRAINT "client_histories_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "client_statuses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
