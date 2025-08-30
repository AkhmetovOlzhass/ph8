/*
  Warnings:

  - You are about to drop the `Solution` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Solution" DROP CONSTRAINT "Solution_taskId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Solution" DROP CONSTRAINT "Solution_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "officialSolution" TEXT;

-- AlterTable
ALTER TABLE "public"."UserTaskProgress" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "public"."Solution";
