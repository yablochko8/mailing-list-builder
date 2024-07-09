/*
  Warnings:

  - You are about to drop the column `content` on the `message` table. All the data in the column will be lost.
  - Added the required column `bodyText` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectText` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `recipient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "content",
ADD COLUMN     "bodyText" TEXT NOT NULL,
ADD COLUMN     "subjectText" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "recipient" ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "recipient" ADD CONSTRAINT "recipient_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
