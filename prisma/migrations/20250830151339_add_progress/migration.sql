-- CreateEnum
CREATE TYPE "public"."ProgressStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'SOLVED');

-- CreateTable
CREATE TABLE "public"."UserTaskProgress" (
    "id" TEXT NOT NULL,
    "status" "public"."ProgressStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,

    CONSTRAINT "UserTaskProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTaskProgress_userId_taskId_key" ON "public"."UserTaskProgress"("userId", "taskId");

-- AddForeignKey
ALTER TABLE "public"."UserTaskProgress" ADD CONSTRAINT "UserTaskProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserTaskProgress" ADD CONSTRAINT "UserTaskProgress_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
