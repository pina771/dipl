import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

interface LatLon {
  lat: number;
  lon: number;
}
export async function PUT(
  request: Request,
  context: { params: { id: string; poiId: string } }
) {
  const pointOfInterest = (await request.json()) as LatLon;

  const poiIdAsNumber = Number.parseInt(context.params.poiId);

  try {
    await prisma.pointOfInterest.update({
      where: {
        id: poiIdAsNumber,
      },
      data: {
        lat: new Prisma.Decimal(pointOfInterest.lat),
        lon: new Prisma.Decimal(pointOfInterest.lon),
      },
    });
    return NextResponse.json(
      { message: "Added coordinates for POI" },
      { status: 200 }
    );
  } catch (er) {
    console.log(er);
    return NextResponse.json({ message: er }, { status: 500 });
  }
}
