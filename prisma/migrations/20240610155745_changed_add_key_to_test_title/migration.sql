/*
  Warnings:

  - Added the required column `photo` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "photo" TEXT NOT NULL;
