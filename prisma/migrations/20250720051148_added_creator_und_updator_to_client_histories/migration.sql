-- AddForeignKey
ALTER TABLE "client_histories" ADD CONSTRAINT "client_histories_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_histories" ADD CONSTRAINT "client_histories_updatorId_fkey" FOREIGN KEY ("updatorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
