/*
  Warnings:

  - You are about to drop the `AssignmentTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientNotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientStatusReasons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientStatuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterpreterLanguages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterpreterPreferredCities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterpreterStatuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPriorities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobStatuses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobTypes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jobs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Languages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ClientNotes" DROP CONSTRAINT "ClientNotes_ClientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientNotes" DROP CONSTRAINT "ClientNotes_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_CityId_fkey";

-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_StatusId_fkey";

-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_StatusReasonId_fkey";

-- DropForeignKey
ALTER TABLE "Clients" DROP CONSTRAINT "Clients_TypeId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterLanguages" DROP CONSTRAINT "InterpreterLanguages_InterpreterId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterLanguages" DROP CONSTRAINT "InterpreterLanguages_LanguageId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterPreferredCities" DROP CONSTRAINT "InterpreterPreferredCities_CityId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterPreferredCities" DROP CONSTRAINT "InterpreterPreferredCities_InterpreterId_fkey";

-- DropForeignKey
ALTER TABLE "Interpreters" DROP CONSTRAINT "Interpreters_StatusId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_AssignmentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_CityId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_ClientId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_InterpreterId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_JobStatusId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_JobTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_LanguageFromId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_LanguageToId_fkey";

-- DropForeignKey
ALTER TABLE "Jobs" DROP CONSTRAINT "Jobs_PriorityId_fkey";

-- DropTable
DROP TABLE "AssignmentTypes";

-- DropTable
DROP TABLE "Cities";

-- DropTable
DROP TABLE "ClientNotes";

-- DropTable
DROP TABLE "ClientStatusReasons";

-- DropTable
DROP TABLE "ClientStatuses";

-- DropTable
DROP TABLE "ClientTypes";

-- DropTable
DROP TABLE "Clients";

-- DropTable
DROP TABLE "InterpreterLanguages";

-- DropTable
DROP TABLE "InterpreterPreferredCities";

-- DropTable
DROP TABLE "InterpreterStatuses";

-- DropTable
DROP TABLE "Interpreters";

-- DropTable
DROP TABLE "JobPriorities";

-- DropTable
DROP TABLE "JobStatuses";

-- DropTable
DROP TABLE "JobTypes";

-- DropTable
DROP TABLE "Jobs";

-- DropTable
DROP TABLE "Languages";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignment_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "assignment_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_priorities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_priorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,
    "statusId" TEXT NOT NULL,
    "statusReasonId" TEXT,
    "statusFollowUpDate" TIMESTAMP(3),
    "email" TEXT,
    "phone" TEXT,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "position" TEXT,
    "address" TEXT,
    "zip" TEXT,
    "cityId" TEXT,
    "invoiceAddress" TEXT,
    "invoiceZip" TEXT,
    "invoiceCity" TEXT,
    "notes" TEXT,
    "creatorId" TEXT NOT NULL,
    "updatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "client_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_status_reasons" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "client_status_reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_notes" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nextStepDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "client_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpreters" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "codeNumber" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "gender" TEXT,
    "birthDate" TIMESTAMP(3),
    "address" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "offersRemote" BOOLEAN NOT NULL,
    "offersOnSite" BOOLEAN NOT NULL,
    "defaultHourlyRate" DOUBLE PRECISION,
    "availability" TEXT,
    "iban" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "interviewDate" TIMESTAMP(3),
    "googleContactId" TEXT,
    "googleEventId" TEXT,
    "statusId" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interpreters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpreter_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "interpreter_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpreter_preferred_cities" (
    "id" TEXT NOT NULL,
    "interpreterId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "interpreter_preferred_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpreter_languages" (
    "id" TEXT NOT NULL,
    "interpreterId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "interpreter_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "interpreterId" TEXT,
    "languageFromId" TEXT NOT NULL,
    "languageToId" TEXT NOT NULL,
    "assignmentTypeId" TEXT NOT NULL,
    "jobTypeId" TEXT NOT NULL,
    "priorityId" TEXT NOT NULL,
    "jobStatusId" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "mode" TEXT NOT NULL,
    "street" TEXT,
    "zip" TEXT,
    "cityId" TEXT NOT NULL,
    "fee" DOUBLE PRECISION,
    "interpreterFee" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_statuses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "job_statuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "interpreters_code_key" ON "interpreters"("code");

-- CreateIndex
CREATE UNIQUE INDEX "interpreters_codeNumber_key" ON "interpreters"("codeNumber");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "client_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "client_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_statusReasonId_fkey" FOREIGN KEY ("statusReasonId") REFERENCES "client_status_reasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_notes" ADD CONSTRAINT "client_notes_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_notes" ADD CONSTRAINT "client_notes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreters" ADD CONSTRAINT "interpreters_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "interpreter_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreter_preferred_cities" ADD CONSTRAINT "interpreter_preferred_cities_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "interpreters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreter_preferred_cities" ADD CONSTRAINT "interpreter_preferred_cities_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreter_languages" ADD CONSTRAINT "interpreter_languages_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "interpreters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpreter_languages" ADD CONSTRAINT "interpreter_languages_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "interpreters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_languageFromId_fkey" FOREIGN KEY ("languageFromId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_languageToId_fkey" FOREIGN KEY ("languageToId") REFERENCES "languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_assignmentTypeId_fkey" FOREIGN KEY ("assignmentTypeId") REFERENCES "assignment_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "job_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "job_priorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_jobStatusId_fkey" FOREIGN KEY ("jobStatusId") REFERENCES "job_statuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
