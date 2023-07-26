/*
  Warnings:

  - Added the required column `private` to the `Chanel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chanel" ADD COLUMN     "private" BOOLEAN NOT NULL;
