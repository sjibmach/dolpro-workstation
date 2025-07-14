-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssignmentType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "AssignmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobPriority" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobPriority_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
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

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClientStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientStatusReason" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL,

    CONSTRAINT "ClientStatusReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientNote" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nextStepDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ClientType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpreter" (
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

    CONSTRAINT "Interpreter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpreterStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InterpreterStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpreterPreferredCity" (
    "id" TEXT NOT NULL,
    "interpreterId" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "InterpreterPreferredCity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterpreterLanguage" (
    "id" TEXT NOT NULL,
    "interpreterId" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,

    CONSTRAINT "InterpreterLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
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

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobStatus" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "JobStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Interpreter_code_key" ON "Interpreter"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Interpreter_codeNumber_key" ON "Interpreter"("codeNumber");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ClientType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ClientStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_statusReasonId_fkey" FOREIGN KEY ("statusReasonId") REFERENCES "ClientStatusReason"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNote" ADD CONSTRAINT "ClientNote_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientNote" ADD CONSTRAINT "ClientNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interpreter" ADD CONSTRAINT "Interpreter_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "InterpreterStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterPreferredCity" ADD CONSTRAINT "InterpreterPreferredCity_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "Interpreter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterPreferredCity" ADD CONSTRAINT "InterpreterPreferredCity_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterLanguage" ADD CONSTRAINT "InterpreterLanguage_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "Interpreter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterpreterLanguage" ADD CONSTRAINT "InterpreterLanguage_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_interpreterId_fkey" FOREIGN KEY ("interpreterId") REFERENCES "Interpreter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_languageFromId_fkey" FOREIGN KEY ("languageFromId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_languageToId_fkey" FOREIGN KEY ("languageToId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_assignmentTypeId_fkey" FOREIGN KEY ("assignmentTypeId") REFERENCES "AssignmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobTypeId_fkey" FOREIGN KEY ("jobTypeId") REFERENCES "JobType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "JobPriority"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_jobStatusId_fkey" FOREIGN KEY ("jobStatusId") REFERENCES "JobStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
