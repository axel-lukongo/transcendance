/*
  Warnings:

  - A unique constraint covering the columns `[user_id,contact_id]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Contact_contact_id_key";

-- DropIndex
DROP INDEX "Contact_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Contact_user_id_contact_id_key" ON "Contact"("user_id", "contact_id");
