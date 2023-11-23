/*
  Warnings:

  - You are about to drop the column `coverImage` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `moblie` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userName]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_userId_fkey`;

-- DropIndex
DROP INDEX `User_moblie_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `coverImage`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `moblie`,
    DROP COLUMN `profileImage`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `post`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ProductName` VARCHAR(191) NOT NULL,
    `price` VARCHAR(191) NOT NULL,
    `information` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `productType` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `user_userName_key` ON `user`(`userName`);

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `user_email_key`;
