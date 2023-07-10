/*
  Warnings:

  - The `lat` column on the `PointOfInterest` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lon` column on the `PointOfInterest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "PointOfInterest" DROP COLUMN "lat",
ADD COLUMN     "lat" DECIMAL(65,30),
DROP COLUMN "lon",
ADD COLUMN     "lon" DECIMAL(65,30);
