-- DropForeignKey
ALTER TABLE "client_contactpersons" DROP CONSTRAINT "client_contactpersons_clientId_fkey";

-- AddForeignKey
ALTER TABLE "client_contactpersons" ADD CONSTRAINT "client_contactpersons_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
