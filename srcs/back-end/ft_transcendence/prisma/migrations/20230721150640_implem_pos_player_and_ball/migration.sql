/*
  Warnings:

  - Added the required column `loser_id` to the `Pong` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winner_id` to the `Pong` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pong" ADD COLUMN     "loser_id" INTEGER NOT NULL,
ADD COLUMN     "winner_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PositionPlayer" (
    "id" SERIAL NOT NULL,
    "playerId" INTEGER NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PositionPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PositionBall" (
    "id" SERIAL NOT NULL,
    "PongId" INTEGER NOT NULL,
    "positionX" INTEGER NOT NULL,
    "positionY" INTEGER NOT NULL,
    "velocityX" DOUBLE PRECISION NOT NULL,
    "velocityY" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PositionBall_pkey" PRIMARY KEY ("id")
);
