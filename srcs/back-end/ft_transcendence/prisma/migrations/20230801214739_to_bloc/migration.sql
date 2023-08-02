-- AlterTable
ALTER TABLE "Chanel" ADD COLUMN     "directMsg" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "interlocutor_id" INTEGER;

-- CreateTable
CREATE TABLE "ToBloc" (
    "id" SERIAL NOT NULL,
    "blocker_id" INTEGER NOT NULL,
    "blocked_id" INTEGER NOT NULL,

    CONSTRAINT "ToBloc_pkey" PRIMARY KEY ("id")
);
