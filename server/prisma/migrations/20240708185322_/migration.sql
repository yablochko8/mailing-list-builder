-- CreateTable
CREATE TABLE "sender" (
    "id" SERIAL NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "list" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "delivered" BOOLEAN NOT NULL,
    "sentDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "blastId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blast" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "senderId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipientsOnMailingLists" (
    "recipientId" INTEGER NOT NULL,
    "mailingListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipientsOnMailingLists_pkey" PRIMARY KEY ("recipientId","mailingListId")
);

-- CreateTable
CREATE TABLE "BlastsToMailingLists" (
    "blastId" INTEGER NOT NULL,
    "mailingListId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlastsToMailingLists_pkey" PRIMARY KEY ("blastId","mailingListId")
);

-- CreateIndex
CREATE UNIQUE INDEX "sender_clerkId_key" ON "sender"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "sender_email_key" ON "sender"("email");

-- CreateIndex
CREATE UNIQUE INDEX "list_name_key" ON "list"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipient_name_key" ON "recipient"("name");

-- AddForeignKey
ALTER TABLE "list" ADD CONSTRAINT "list_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_blastId_fkey" FOREIGN KEY ("blastId") REFERENCES "blast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blast" ADD CONSTRAINT "blast_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "sender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientsOnMailingLists" ADD CONSTRAINT "RecipientsOnMailingLists_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipientsOnMailingLists" ADD CONSTRAINT "RecipientsOnMailingLists_mailingListId_fkey" FOREIGN KEY ("mailingListId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlastsToMailingLists" ADD CONSTRAINT "BlastsToMailingLists_blastId_fkey" FOREIGN KEY ("blastId") REFERENCES "blast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlastsToMailingLists" ADD CONSTRAINT "BlastsToMailingLists_mailingListId_fkey" FOREIGN KEY ("mailingListId") REFERENCES "list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
