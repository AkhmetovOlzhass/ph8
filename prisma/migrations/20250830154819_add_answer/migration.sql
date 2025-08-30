-- CreateEnum
CREATE TYPE "public"."AnswerType" AS ENUM ('TEXT', 'NUMBER', 'FORMULA');

-- AlterTable
ALTER TABLE "public"."Task" ADD COLUMN     "answerType" "public"."AnswerType" NOT NULL DEFAULT 'TEXT',
ADD COLUMN     "correctAnswer" TEXT;
