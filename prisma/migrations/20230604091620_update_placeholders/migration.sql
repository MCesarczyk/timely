/*
  Warnings:

  - Made the column `done` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "done" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT 'No title';
