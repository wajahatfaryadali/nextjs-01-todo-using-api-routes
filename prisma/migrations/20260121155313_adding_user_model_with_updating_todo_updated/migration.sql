/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title,userID]` on the table `Todo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "deletedAt",
DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "deletedAt",
DROP COLUMN "isDeleted";

-- CreateIndex
CREATE UNIQUE INDEX "Todo_title_userID_key" ON "Todo"("title", "userID");
