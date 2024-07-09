/*
  Warnings:

  - A unique constraint covering the columns `[senderId,email]` on the table `recipient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "recipient_senderId_email_key" ON "recipient"("senderId", "email");
