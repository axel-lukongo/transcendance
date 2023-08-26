/*
  Warnings:

  - You are about to drop the column `intra_login` on the `User` table. All the data in the column will be lost.
  - Added the required column `connection_status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_intra_login_key";

-- AlterTable
ALTER TABLE "Ball" ALTER COLUMN "directionX" SET DEFAULT -20;

-- AlterTable
ALTER TABLE "Chanel" ADD COLUMN     "interlocutor_avatar" TEXT,
ADD COLUMN     "interlocutor_name" TEXT;

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "invite_game" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "positionX" SET DEFAULT 10,
ALTER COLUMN "positionY" SET DEFAULT 50;

-- AlterTable
ALTER TABLE "Pong" ADD COLUMN     "start" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "intra_login",
ADD COLUMN     "connection_status" INTEGER NOT NULL,
ALTER COLUMN "level" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Chanel" ADD CONSTRAINT "Chanel_interlocutor_id_fkey" FOREIGN KEY ("interlocutor_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
