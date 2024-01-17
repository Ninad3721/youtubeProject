/*
  Warnings:

  - You are about to drop the column `password` on the `user_info` table. All the data in the column will be lost.
  - Added the required column `role` to the `user_info` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `user_info` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user_info` DROP COLUMN `password`,
    ADD COLUMN `role` VARCHAR(45) NOT NULL,
    MODIFY `name` VARCHAR(45) NOT NULL;
