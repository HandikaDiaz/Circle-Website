-- AlterTable
ALTER TABLE "post" ALTER COLUMN "likesCount" SET DEFAULT 0,
ALTER COLUMN "repliesCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "reply" ALTER COLUMN "likesCount" SET DEFAULT 0,
ALTER COLUMN "repliesCount" SET DEFAULT 0;
