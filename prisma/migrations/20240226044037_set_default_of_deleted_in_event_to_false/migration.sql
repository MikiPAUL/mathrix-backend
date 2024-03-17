/*
  Warnings:
  -- set default value of deleted column in event table as false

*/

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "deleted" SET DEFAULT false;
