/*
  Warnings:

  - Made the column `isDeleted` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "isDeleted" SET NOT NULL;
