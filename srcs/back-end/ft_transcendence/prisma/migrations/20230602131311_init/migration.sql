-- DropForeignKey
ALTER TABLE "Chanel" DROP CONSTRAINT "Chanel_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chan_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "Users_Chanels" DROP CONSTRAINT "Users_Chanels_chanel_id_fkey";
