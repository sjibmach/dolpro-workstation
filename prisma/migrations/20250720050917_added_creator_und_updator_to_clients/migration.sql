-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_updatorId_fkey" FOREIGN KEY ("updatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
