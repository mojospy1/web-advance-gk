
CREATE DATABASE `library_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `library_db`;

CREATE TABLE `books` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `author` VARCHAR(150) NOT NULL,
  `publishedYear` INT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `readers` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(254) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UQ_readers_email` (`email`)
);

CREATE TABLE `borrowed_records` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `bookId` INT NOT NULL,
  `readerId` INT NOT NULL,
  `borrowedAt` DATETIME NOT NULL,
  `returnedAt` DATETIME NULL,
  PRIMARY KEY (`id`)
);
