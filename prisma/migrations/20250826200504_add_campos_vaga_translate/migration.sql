/*
  Warnings:

  - The values [ABERTA,FECHADA] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `descricao` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `empresa` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `modalidade` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `nivelSenioridade` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `requisitos` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `salario` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `tipoContrato` on the `Vaga` table. All the data in the column will be lost.
  - You are about to drop the column `titulo` on the `Vaga` table. All the data in the column will be lost.
  - Added the required column `company` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contractType` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seniorityLevel` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Vaga` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workMode` to the `Vaga` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."workMode" AS ENUM ('REMOTE', 'HYBRID', 'ONSITE');

-- CreateEnum
CREATE TYPE "public"."contractType" AS ENUM ('CLT', 'CONTRACTOR', 'FREELANCER');

-- CreateEnum
CREATE TYPE "public"."seniorityLevel" AS ENUM ('JUNIOR', 'MID', 'SENIOR');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Status_new" AS ENUM ('OPEN', 'CLOSED');
ALTER TABLE "public"."Vaga" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Vaga" ALTER COLUMN "status" TYPE "public"."Status_new" USING ("status"::text::"public"."Status_new");
ALTER TYPE "public"."Status" RENAME TO "Status_old";
ALTER TYPE "public"."Status_new" RENAME TO "Status";
DROP TYPE "public"."Status_old";
ALTER TABLE "public"."Vaga" ALTER COLUMN "status" SET DEFAULT 'OPEN';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Vaga" DROP COLUMN "descricao",
DROP COLUMN "empresa",
DROP COLUMN "localizacao",
DROP COLUMN "modalidade",
DROP COLUMN "nivelSenioridade",
DROP COLUMN "requisitos",
DROP COLUMN "salario",
DROP COLUMN "tipoContrato",
DROP COLUMN "titulo",
ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "contractType" "public"."contractType" NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "salary" DOUBLE PRECISION,
ADD COLUMN     "seniorityLevel" "public"."seniorityLevel" NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "workMode" "public"."workMode" NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'OPEN';

-- DropEnum
DROP TYPE "public"."Modalidade";

-- DropEnum
DROP TYPE "public"."NivelSenioridade";

-- DropEnum
DROP TYPE "public"."TipoContrato";
