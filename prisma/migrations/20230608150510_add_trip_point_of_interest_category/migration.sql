-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "dateFrom" TIMESTAMP(3) NOT NULL,
    "dateUntil" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointOfInterest" (
    "id" SERIAL NOT NULL,
    "tripId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "status" TEXT NOT NULL DEFAULT 'awaiting',
    "lat" TEXT NOT NULL,
    "lon" TEXT NOT NULL,

    CONSTRAINT "PointOfInterest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_TripToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPointOfInterest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TripToUser_AB_unique" ON "_TripToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_TripToUser_B_index" ON "_TripToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPointOfInterest_AB_unique" ON "_CategoryToPointOfInterest"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPointOfInterest_B_index" ON "_CategoryToPointOfInterest"("B");

-- AddForeignKey
ALTER TABLE "PointOfInterest" ADD CONSTRAINT "PointOfInterest_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TripToUser" ADD CONSTRAINT "_TripToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPointOfInterest" ADD CONSTRAINT "_CategoryToPointOfInterest_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPointOfInterest" ADD CONSTRAINT "_CategoryToPointOfInterest_B_fkey" FOREIGN KEY ("B") REFERENCES "PointOfInterest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
