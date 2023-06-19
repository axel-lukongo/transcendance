/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[intra_login]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `intra_login` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "intra_login" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_intra_login_key" ON "User"("intra_login");
