/*
  Warnings:

  - Added the required column `time_limit` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "time_limit",
ADD COLUMN     "time_limit" INTEGER NOT NULL;
