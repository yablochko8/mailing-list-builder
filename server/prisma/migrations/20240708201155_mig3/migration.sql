/*
  Warnings:

  - The values [sent,failed] on the enum `MessageStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `blast` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `delivered` on the `message` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BlastStatus" AS ENUM ('draft', 'ongoing', 'completed', 'failed');

-- AlterEnum
BEGIN;
CREATE TYPE "MessageStatus_new" AS ENUM ('draft', 'queued', 'sentWithSuccess', 'sentButFailed');
ALTER TABLE "message" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "message" ALTER COLUMN "status" TYPE "MessageStatus_new" USING ("status"::text::"MessageStatus_new");
ALTER TYPE "MessageStatus" RENAME TO "MessageStatus_old";
ALTER TYPE "MessageStatus_new" RENAME TO "MessageStatus";
DROP TYPE "MessageStatus_old";
ALTER TABLE "message" ALTER COLUMN "status" SET DEFAULT 'draft';
COMMIT;

-- DropIndex
DROP INDEX "recipient_name_key";

-- AlterTable
ALTER TABLE "blast" DROP COLUMN "status",
ADD COLUMN     "status" "BlastStatus" NOT NULL DEFAULT 'draft';

-- AlterTable
ALTER TABLE "message" DROP COLUMN "delivered";
