-- DropForeignKey
ALTER TABLE "UserTrips" DROP CONSTRAINT "UserTrips_tripId_fkey";

-- AddForeignKey
ALTER TABLE "UserTrips" ADD CONSTRAINT "UserTrips_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;
