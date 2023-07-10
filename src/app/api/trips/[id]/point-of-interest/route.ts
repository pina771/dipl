import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { authOptions } from "../../../auth/[...nextauth]/route";

interface PointOfInterest {
  name: string;
  desc?: string;
  categoryIds: number[];
}

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  try {
    const result = await prisma.pointOfInterest.findMany({
      where: {
        tripId: context.params.id,
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    console.log(e);
    throw new Error("prisma eerror");
  }
}

export async function POST(
  request: Request,
  context: { params: { id: string } }
) {
  const tripId = context.params.id;
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Not authorized." }, { status: 401 });
  }
  // check if user is a member of trip
  const isMemberOfTrip = await prisma.userTrips.findUnique({
    where: {
      userId_tripId: {
        tripId: tripId,
        userId: session.user.id,
      },
    },
  });
  if (!isMemberOfTrip) {
    return NextResponse.json(
      { message: "not authorized, only trip members can add points" },
      { status: 401 }
    );
  }

  const pointOfInterest = (await request.json()) as PointOfInterest;
  try {
    await prisma.pointOfInterest.create({
      data: {
        name: pointOfInterest.name,
        desc: pointOfInterest.desc,
        tripId,
        categories: {
          connect: pointOfInterest.categoryIds.map((id) => ({ id: id })) || [],
        },
      },
    });
    return NextResponse.json(
      { message: "New point of interest added." },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error occurred during inserting record." },
      { status: 500 }
    );
  }
}
