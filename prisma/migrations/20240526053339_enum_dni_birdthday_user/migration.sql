/*
  Warnings:

  - Added the required column `birthDate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dni` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ORGANIZER', 'COACH', 'PLAYER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" VARCHAR(10) NOT NULL,
ADD COLUMN     "dni" VARCHAR(20) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL;
