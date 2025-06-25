/*
  Warnings:

  - Made the column `name` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sku` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `name` VARCHAR(128) NOT NULL,
    MODIFY `sku` VARCHAR(92) NOT NULL;
