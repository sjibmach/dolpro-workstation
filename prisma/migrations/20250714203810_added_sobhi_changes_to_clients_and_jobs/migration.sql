/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `client_status_reasons` table. All the data in the column will be lost.
  - You are about to drop the column `contactEmail` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `contactName` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `contactPhone` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceAddress` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceCity` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceZip` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `assignmentTypeId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `cityId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `jobStatusId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `languageFromId` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `zip` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the `assignment_types` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `client_notes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[codeNumber]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codeNumber` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `statusId` on table `clients` required. This step will fail if there are existing NULL values in that column.
  - Made the column `creatorId` on table `clients` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `addressCityId` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codeNumber` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `creatorId` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryDate` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobDate` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "client_notes" DROP CONSTRAINT "client_notes_clientId_fkey";

-- DropForeignKey
ALTER TABLE "client_notes" DROP CONSTRAINT "client_notes_userId_fkey";

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_statusId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_assignmentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_cityId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_jobStatusId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_languageFromId_fkey";

-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "client_status_reasons" DROP COLUMN "sortOrder",
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "client_types" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "contactEmail",
DROP COLUMN "contactName",
DROP COLUMN "contactPhone",
DROP COLUMN "invoiceAddress",
DROP COLUMN "invoiceCity",
DROP COLUMN "invoiceZip",
DROP COLUMN "position",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "codeNumber" INTEGER NOT NULL,
ADD COLUMN     "nameShortcut" TEXT,
ALTER COLUMN "statusId" SET NOT NULL,
ALTER COLUMN "statusId" DROP DEFAULT,
ALTER COLUMN "creatorId" SET NOT NULL;

-- AlterTable
ALTER TABLE "interpreter_statuses" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "interpreters" ADD COLUMN     "cityId" TEXT;

-- AlterTable
ALTER TABLE "job_priorities" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "job_statuses" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "job_types" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "assignmentTypeId",
DROP COLUMN "cityId",
DROP COLUMN "date",
DROP COLUMN "jobStatusId",
DROP COLUMN "languageFromId",
DROP COLUMN "street",
DROP COLUMN "zip",
ADD COLUMN     "addressCityId" TEXT NOT NULL,
ADD COLUMN     "addressStreet" TEXT,
ADD COLUMN     "addressZip" TEXT,
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "codeNumber" INTEGER NOT NULL,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "distanceKm" INTEGER,
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "finalPriceClient" DOUBLE PRECISION,
ADD COLUMN     "finalPriceInterpreter" DOUBLE PRECISION,
ADD COLUMN     "invoiceAddress" TEXT,
ADD COLUMN     "jobDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "kmRateClient" DOUBLE PRECISION,
ADD COLUMN     "kmRateInterpreter" DOUBLE PRECISION,
ADD COLUMN     "rhythmText" TEXT,
ADD COLUMN     "statusId" TEXT NOT NULL,
ADD COLUMN     "surchargeRareLanguage" DOUBLE PRECISION,
ADD COLUMN     "surchargeUrgency" DOUBLE PRECISION,
ADD COLUMN     "updatorId" TEXT;

-- AlterTable
ALTER TABLE "languages" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortIndex" INTEGER;

-- DropTable
DROP TABLE "assignment_types";

-- DropTable
DROP TABLE "client_notes";

-- CreateTable
CREATE TABLE "client_contactpersons" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "salutation" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT,
    "zip" TEXT,
    "cityId" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "client_contactpersons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_contactpersons" (
    "id" TEXT NOT NULL,
    "salutation" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT,
    "zip" TEXT,
    "cityId" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "job_contactpersons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_code_key" ON "clients"("code");

-- CreateIndex
CREATE UNIQUE INDEX "clients_codeNumber_key" ON "clients"("codeNumber");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "client_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_contactpersons" ADD CONSTRAINT "client_contactpersons_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_contactpersons" ADD CONSTRAINT "client_contactpersons_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreters" ADD CONSTRAINT "interpreters_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "job_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_addressCityId_fkey" FOREIGN KEY ("addressCityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_contactpersons" ADD CONSTRAINT "job_contactpersons_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_contactpersons" ADD CONSTRAINT "job_contactpersons_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
