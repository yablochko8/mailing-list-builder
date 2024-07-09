/*
  Warnings:

  - You are about to drop the column `sentDate` on the `message` table. All the data in the column will be lost.
  - The `status` column on the `message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `BlastsToMailingLists` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RecipientsOnMailingLists` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('draft', 'queued', 'sent', 'failed');

-- DropForeignKey
ALTER TABLE "BlastsToMailingLists" DROP CONSTRAINT "BlastsToMailingLists_blastId_fkey";

-- DropForeignKey
ALTER TABLE "BlastsToMailingLists" DROP CONSTRAINT "BlastsToMailingLists_mailingListId_fkey";

-- DropForeignKey
ALTER TABLE "RecipientsOnMailingLists" DROP CONSTRAINT "RecipientsOnMailingLists_mailingListId_fkey";

-- DropForeignKey
ALTER TABLE "RecipientsOnMailingLists" DROP CONSTRAINT "RecipientsOnMailingLists_recipientId_fkey";

-- AlterTable
ALTER TABLE "blast" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "list" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "message" DROP COLUMN "sentDate",
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "sentAt" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "delivered" SET DEFAULT false,
DROP COLUMN "status",
ADD COLUMN     "status" "MessageStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "recipient" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "sender" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE "BlastsToMailingLists";

-- DropTable
DROP TABLE "RecipientsOnMailingLists";

-- CreateTable
CREATE TABLE "RecipientsOnLists" (
    "recipientId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "RecipientsOnLists_pkey" PRIMARY KEY ("recipientId","listId")
);

-- CreateTable
CREATE TABLE "BlastsToLists" (
    "blastId" INTEGER NOT NULL,
    "listId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "BlastsToLists_pkey" PRIMARY KEY ("blastId","listId")
);

-- AddForeignKey
ALTER TABLE "RecipientsOnLists" ADD CONSTRAINT "RecipientsOnLists_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientsOnLists" ADD CONSTRAINT "RecipientsOnLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlastsToLists" ADD CONSTRAINT "BlastsToLists_blastId_fkey" FOREIGN KEY ("blastId") REFERENCES "blast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlastsToLists" ADD CONSTRAINT "BlastsToLists_listId_fkey" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
