/*
  Warnings:

  - Added the required column `schoolClass` to the `Topic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SchoolClass" AS ENUM ('SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN');

-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_topicId_fkey";

-- AlterTable
ALTER TABLE "public"."Topic" ADD COLUMN     "schoolClass" "public"."SchoolClass" NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "public"."Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
