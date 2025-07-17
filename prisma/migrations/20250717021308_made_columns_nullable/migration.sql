-- CreateEnum
CREATE TYPE "JobPriorityId" AS ENUM ('high', 'medium', 'low');

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_addressCityId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_jobTypeId_fkey";

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "jobTypeId" DROP NOT NULL,
ALTER COLUMN "priorityId" SET DEFAULT 'medium',
ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "durationMinutes" DROP NOT NULL,
ALTER COLUMN "mode" DROP NOT NULL,
ALTER COLUMN "addressCityId" DROP NOT NULL,
ALTER COLUMN "entryDate" DROP NOT NULL,
ALTER COLUMN "jobDate" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "job_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_addressCityId_fkey" FOREIGN KEY ("addressCityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
