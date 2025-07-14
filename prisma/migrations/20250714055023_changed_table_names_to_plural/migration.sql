/*
  Warnings:

  - You are about to drop the `AssignmentType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientNote` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientStatusReason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClientType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Interpreter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterpreterLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterpreterPreferredCity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterpreterStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobPriority` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_statusReasonId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_typeId_fkey";

-- DropForeignKey
ALTER TABLE "ClientNote" DROP CONSTRAINT "ClientNote_clientId_fkey";

-- DropForeignKey
ALTER TABLE "ClientNote" DROP CONSTRAINT "ClientNote_userId_fkey";

-- DropForeignKey
ALTER TABLE "Interpreter" DROP CONSTRAINT "Interpreter_statusId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterLanguage" DROP CONSTRAINT "InterpreterLanguage_interpreterId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterLanguage" DROP CONSTRAINT "InterpreterLanguage_languageId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterPreferredCity" DROP CONSTRAINT "InterpreterPreferredCity_cityId_fkey";

-- DropForeignKey
ALTER TABLE "InterpreterPreferredCity" DROP CONSTRAINT "InterpreterPreferredCity_interpreterId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_assignmentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_interpreterId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_jobStatusId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_jobTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_languageFromId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_languageToId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_priorityId_fkey";

-- DropTable
DROP TABLE "AssignmentType";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "ClientNote";

-- DropTable
DROP TABLE "ClientStatus";

-- DropTable
DROP TABLE "ClientStatusReason";

-- DropTable
DROP TABLE "ClientType";

-- DropTable
DROP TABLE "Interpreter";

-- DropTable
DROP TABLE "InterpreterLanguage";

-- DropTable
DROP TABLE "InterpreterPreferredCity";

-- DropTable
DROP TABLE "InterpreterStatus";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "JobPriority";

-- DropTable
DROP TABLE "JobStatus";

-- DropTable
DROP TABLE "JobType";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Languages" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cities" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentTypes" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "AssignmentTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTypes" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "JobTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPriorities" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "JobPriorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "TypeId" TEXT NOT NULL,
    "StatusId" TEXT NOT NULL,
    "StatusReasonId" TEXT,
    "StatusFollowUpDate" TIMESTAMP(3),
    "Email" TEXT,
    "Phone" TEXT,
    "ContactName" TEXT,
    "ContactEmail" TEXT,
    "ContactPhone" TEXT,
    "Position" TEXT,
    "Address" TEXT,
    "Zip" TEXT,
    "CityId" TEXT,
    "InvoiceAddress" TEXT,
    "InvoiceZip" TEXT,
    "InvoiceCity" TEXT,
    "Notes" TEXT,
    "CreatorId" TEXT NOT NULL,
    "UpdatorId" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientStatuses" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "ClientStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientStatusReasons" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Active" BOOLEAN NOT NULL DEFAULT true,
    "SortOrder" INTEGER NOT NULL,

    CONSTRAINT "ClientStatusReasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientNotes" (
    "id" TEXT NOT NULL,
    "ClientId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "NextStepDate" TIMESTAMP(3),
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientNotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientTypes" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "ClientTypes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpreters" (
    "id" TEXT NOT NULL,
    "Code" TEXT NOT NULL,
    "CodeNumber" INTEGER NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT,
    "Phone" TEXT,
    "Gender" TEXT,
    "BirthDate" TIMESTAMP(3),
    "Address" TEXT,
    "Zip" TEXT,
    "City" TEXT,
    "OffersRemote" BOOLEAN NOT NULL,
    "OffersOnSite" BOOLEAN NOT NULL,
    "DefaultHourlyRate" DOUBLE PRECISION,
    "Availability" TEXT,
    "Iban" TEXT,
    "StartDate" TIMESTAMP(3),
    "EndDate" TIMESTAMP(3),
    "InterviewDate" TIMESTAMP(3),
    "GoogleContactId" TEXT,
    "GoogleEventId" TEXT,
    "StatusId" TEXT NOT NULL,
    "Notes" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interpreters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpreterStatuses" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "InterpreterStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpreterPreferredCities" (
    "id" TEXT NOT NULL,
    "InterpreterId" TEXT NOT NULL,
    "CityId" TEXT NOT NULL,

    CONSTRAINT "InterpreterPreferredCities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpreterLanguages" (
    "id" TEXT NOT NULL,
    "InterpreterId" TEXT NOT NULL,
    "LanguageId" TEXT NOT NULL,

    CONSTRAINT "InterpreterLanguages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "ClientId" TEXT NOT NULL,
    "InterpreterId" TEXT,
    "LanguageFromId" TEXT NOT NULL,
    "LanguageToId" TEXT NOT NULL,
    "AssignmentTypeId" TEXT NOT NULL,
    "JobTypeId" TEXT NOT NULL,
    "PriorityId" TEXT NOT NULL,
    "JobStatusId" TEXT NOT NULL,
    "Description" TEXT,
    "Date" TIMESTAMP(3) NOT NULL,
    "StartTime" TIMESTAMP(3) NOT NULL,
    "EndTime" TIMESTAMP(3) NOT NULL,
    "DurationMinutes" INTEGER NOT NULL,
    "Mode" TEXT NOT NULL,
    "Street" TEXT,
    "Zip" TEXT,
    "CityId" TEXT NOT NULL,
    "Fee" DOUBLE PRECISION,
    "InterpreterFee" DOUBLE PRECISION,
    "Notes" TEXT,
    "CreatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobStatuses" (
    "id" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "JobStatuses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_Email_key" ON "Users"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Interpreters_Code_key" ON "Interpreters"("Code");

-- CreateIndex
CREATE UNIQUE INDEX "Interpreters_CodeNumber_key" ON "Interpreters"("CodeNumber");

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_TypeId_fkey" FOREIGN KEY ("TypeId") REFERENCES "ClientTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_StatusId_fkey" FOREIGN KEY ("StatusId") REFERENCES "ClientStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_StatusReasonId_fkey" FOREIGN KEY ("StatusReasonId") REFERENCES "ClientStatusReasons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_CityId_fkey" FOREIGN KEY ("CityId") REFERENCES "Cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNotes" ADD CONSTRAINT "ClientNotes_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNotes" ADD CONSTRAINT "ClientNotes_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interpreters" ADD CONSTRAINT "Interpreters_StatusId_fkey" FOREIGN KEY ("StatusId") REFERENCES "InterpreterStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterPreferredCities" ADD CONSTRAINT "InterpreterPreferredCities_InterpreterId_fkey" FOREIGN KEY ("InterpreterId") REFERENCES "Interpreters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterPreferredCities" ADD CONSTRAINT "InterpreterPreferredCities_CityId_fkey" FOREIGN KEY ("CityId") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterLanguages" ADD CONSTRAINT "InterpreterLanguages_InterpreterId_fkey" FOREIGN KEY ("InterpreterId") REFERENCES "Interpreters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterLanguages" ADD CONSTRAINT "InterpreterLanguages_LanguageId_fkey" FOREIGN KEY ("LanguageId") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_ClientId_fkey" FOREIGN KEY ("ClientId") REFERENCES "Clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_InterpreterId_fkey" FOREIGN KEY ("InterpreterId") REFERENCES "Interpreters"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_LanguageFromId_fkey" FOREIGN KEY ("LanguageFromId") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_LanguageToId_fkey" FOREIGN KEY ("LanguageToId") REFERENCES "Languages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_AssignmentTypeId_fkey" FOREIGN KEY ("AssignmentTypeId") REFERENCES "AssignmentTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_JobTypeId_fkey" FOREIGN KEY ("JobTypeId") REFERENCES "JobTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_PriorityId_fkey" FOREIGN KEY ("PriorityId") REFERENCES "JobPriorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_JobStatusId_fkey" FOREIGN KEY ("JobStatusId") REFERENCES "JobStatuses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Jobs" ADD CONSTRAINT "Jobs_CityId_fkey" FOREIGN KEY ("CityId") REFERENCES "Cities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
