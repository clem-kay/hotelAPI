/*
  Warnings:

  - You are about to drop the column `checkedIn` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_roomId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "checkedIn",
DROP COLUMN "endDate",
DROP COLUMN "roomId",
DROP COLUMN "startDate",
ADD COLUMN     "totalAmount" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "RoomBooked" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "checkedIn" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "RoomBooked_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomBooked" ADD CONSTRAINT "RoomBooked_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
