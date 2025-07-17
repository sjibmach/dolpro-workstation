-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_priorityId_fkey";

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "priorityId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "job_priorities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
