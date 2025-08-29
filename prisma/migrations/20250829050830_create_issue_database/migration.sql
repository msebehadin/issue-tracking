-- CreateEnum
CREATE TYPE "public"."status" AS ENUM ('OPEN', 'IN_PROGRESS', 'CLOSED');

-- CreateTable
CREATE TABLE "public"."Issue" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."status" NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "Issue_pkey" PRIMARY KEY ("id")
);
