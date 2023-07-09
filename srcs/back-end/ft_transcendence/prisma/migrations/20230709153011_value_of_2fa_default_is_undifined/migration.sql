-- AlterTable
ALTER TABLE "User" ADD COLUMN     "is_connecting" BOOLEAN DEFAULT true,
ADD COLUMN     "tfa_code" TEXT,
ALTER COLUMN "token" DROP NOT NULL;
