-- AlterTable
ALTER TABLE "users" ADD COLUMN     "followers" INTEGER DEFAULT 0,
ADD COLUMN     "following" INTEGER DEFAULT 0;
