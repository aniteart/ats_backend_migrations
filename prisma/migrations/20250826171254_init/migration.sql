-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('ABERTA', 'FECHADA');

-- CreateEnum
CREATE TYPE "public"."Modalidade" AS ENUM ('REMOTO', 'HIBRIDO', 'PRESENCIAL');

-- CreateEnum
CREATE TYPE "public"."TipoContrato" AS ENUM ('CLT', 'PJ', 'FREELANCER');

-- CreateEnum
CREATE TYPE "public"."NivelSenioridade" AS ENUM ('JUNIOR', 'PLENO', 'SENIOR');

-- CreateTable
CREATE TABLE "public"."Vaga" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "salario" DOUBLE PRECISION,
    "status" "public"."Status" NOT NULL DEFAULT 'ABERTA',
    "modalidade" "public"."Modalidade" NOT NULL,
    "tipoContrato" "public"."TipoContrato" NOT NULL,
    "nivelSenioridade" "public"."NivelSenioridade" NOT NULL,
    "requisitos" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);
