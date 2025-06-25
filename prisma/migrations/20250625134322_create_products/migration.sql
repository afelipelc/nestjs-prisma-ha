-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(128) NULL,
    `sku` VARCHAR(92) NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DECIMAL(8, 2) NOT NULL,
    `publicPrice` DECIMAL(8, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
