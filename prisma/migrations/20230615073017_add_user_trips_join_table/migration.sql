/*
  Warnings:

  - You are about to drop the `_TripToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_TripToUser" DROP CONSTRAINT "_TripToUser_B_fkey";

-- DropTable
DROP TABLE "_TripToUser";

-- CreateTable
CREATE TABLE "UserTrips" (
    "userId" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "UserTrips_pkey" PRIMARY KEY ("userId","tripId")
);

-- AddForeignKey
ALTER TABLE "UserTrips" ADD CONSTRAINT "UserTrips_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTrips" ADD CONSTRAINT "UserTrips_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
