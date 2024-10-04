/*
  Warnings:

  - Added the required column `authorId` to the `reply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reply" ADD COLUMN     "authorId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
