-- DropIndex
DROP INDEX "clients_codeNumber_key";

-- DropIndex
DROP INDEX "clients_code_key";

-- AlterTable
ALTER TABLE "clients" ALTER COLUMN "creatorId" DROP NOT NULL,
ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "codeNumber" DROP NOT NULL;
